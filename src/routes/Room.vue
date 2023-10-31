<script setup>
import { computed, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router'

import Keyboard from '../components/Keyboard.vue';
import Modal from '../components/Modal.vue';
import { successSnackBar, warningSnackBar } from "../utils/snackbars";
import { gameState, socket } from '../utils/socket'
import { store } from '../utils/store';

const username = ref(store.username)
const router = useRouter()
const {params} = useRoute()
let userID = localStorage.getItem('hangman-user')

function joinGame() {
  socket.connect();
  socket.emit('join-room', {room: params.id, user: { id:userID, name: store.username }})
}

if (!gameState.code && store.username) joinGame()

function gatherName() {
  store.setName(username.value)
  joinGame()
}

const mistakes = computed(() => (
  gameState.state.guessed?.reduce((acc, letter) => gameState.state.word.toUpperCase().includes(letter) ? acc : acc + 1, 0) || 0
))

function leaveRoom() {
  Object.assign(gameState, {code: '', state: {}});
  socket.disconnect();
  warningSnackBar('Game room left');
  router.push('/game-select');
}

function newWord() {
  socket.emit('new-word', {room: params.id, user: { id:userID, name: store.username }})
}

function copyCode() {
  navigator.clipboard.writeText(gameState.code);
  successSnackBar('Copied to clipboard!')
}

</script>

<template>
  <div class="grid h-screen w-screen grid-flow-row grid-cols-[12em_1fr]">
    <div class="h-screen overflow-x-auto bg-neutral-800">
      <div
        v-for="(player, index) in gameState.state.players"
        :key="player.id"
        class="border-b-2 border-neutral-600 p-2"
        :class="{'border-x-8 bg-neutral-700': gameState.state.turn % gameState.state.players.length == index}"
      >
        <p class="text-center text-lg font-bold">
          {{ player.name }}
        </p>
        <p class="flex justify-around">
          <span class="text-emerald-400"><span class="font-bold">{{ player.correct }}</span> right</span> <span class="text-rose-400"><span class="font-bold">{{ player.mistakes }}</span> wrong</span>
        </p>
      </div>

      <div class="fixed bottom-4 w-48 text-center text-neutral-400">
        <p>Invite more friends:</p>
        <button
          class="font-bold"
          @click="copyCode"
        >
          {{ params.id }}
        </button>
      </div>
    </div>
    <div class="row-span-2 flex h-screen flex-col items-center justify-center overflow-x-auto">
      <button
        class="fixed left-52 top-3"
        @click="leaveRoom"
      >
        <span class="material-symbols-rounded text-4xl font-bold">arrow_back_ios</span>
      </button>
    
      <img
        :src="'./hangman/' + mistakes + '.png'"
        class="h-80 invert"
      >

      <p class="m-10 whitespace-pre text-3xl font-bold">
        {{ gameState?.state?.word }}
      </p>

      <Keyboard
        v-if="!(mistakes === 7) && gameState?.state?.word?.includes('_')"
        :guessed="gameState.state.guessed"
        @guess="(guess) => socket.emit('guess-letter', {guess, room: params.id, userID})"
      />
    
      <p
        v-if="!gameState?.state?.word?.includes('_')"
        class="flex flex-col items-center text-3xl font-bold text-emerald-600"
      >
        You saved the hanging man!
        <button
          class="btn-green mt-5 block"
          @click="newWord"
        >
          Play again?
        </button>
      </p>
      <p
        v-if="mistakes === 7"
        class="flex flex-col items-center text-3xl font-bold text-rose-600"
      >
        And so the man dies...
        <button
          class="btn-red mt-5 block"
          @click="newWord"
        >
          Play again?
        </button>
      </p>
    </div>
  </div>

  <Modal
    v-if="!store.username"
    title="Chose a username"
  >
    <div class="flex justify-center pt-4">
      <input
        v-model="username"
        type="text"
        class="text-input"
      >
    </div>
    <template #buttons>
      <button
        v-if="username"
        class="btn-blue"
        @click="gatherName"
      >
        Continue
      </button>
    </template>
  </Modal>
</template>