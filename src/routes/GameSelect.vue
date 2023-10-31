<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'

import Modal from '../components/Modal.vue';
import { gameState, socket } from '../utils/socket'
import { store } from '../utils/store';

const router = useRouter()
let userID = localStorage.getItem('hangman-user')

if (store.username === '') router.push('/')

const customWordModal = ref(false)
const customWord = ref("")
const wordErrors= ref(false)

const onlineLobbyModal = ref(false)
const onlineCode = ref("")

watch(gameState, (newState) => {
  router.push(`/${newState.code}`)
})

watch(customWord, (word) => {
  wordErrors.value = /[^a-zA-Z ]/g.test(word)
})

</script>

<template>
  <button
    class="fixed left-3 top-3"
    @click="() => router.push('/')"
  >
    <span class="material-symbols-rounded text-4xl font-bold">arrow_back_ios</span>
  </button>

  <h1 class="mb-12 text-xl">
    Hello <span class="font-bold">{{ store.username }}</span>, chose your game mode 
    <!-- {{ gameState.code }} -->
  </h1>
  <button
    class="btn-red my-1 text-lg"
    @click="() => {
      store.setRandomWord()
      router.push('/game')
    }"
  >
    Random word <span class="material-symbols-rounded -mx-1 align-middle">keyboard_arrow_right</span>
  </button>
  <button
    class="btn-blue my-1 text-lg"
    @click="() => { 
      customWordModal = true
    }"
  >
    Custom word <span class="material-symbols-rounded -mx-1 align-middle">keyboard_arrow_right</span>
  </button>
  <hr class="my-2">
  <button
    class="btn-green my-1 text-lg"
    @click="() => {
      onlineLobbyModal = true
    }"
  >
    Online <span class="material-symbols-rounded -mx-1 align-middle">keyboard_arrow_right</span>
  </button>

  <Modal
    v-if="customWordModal"
    title="Select word"
    :close="() => customWordModal = false"
  >
    <div class="flex justify-center pt-4">
      <input
        v-model="customWord"
        type="text"
        class="text-input"
      >
    </div>
    <p
      v-if="wordErrors"
      class="mt-2 text-center text-rose-500"
    >
      Use only letters and spaces
    </p>
    <template #buttons>
      <button
        v-if="customWord && !wordErrors"
        class="btn-blue"
        @click="() => {
          customWordModal = false
          store.word = customWord
          router.push('/game')
        }"
      >
        Start Game
      </button>
    </template>
  </Modal>

  <Modal
    v-if="onlineLobbyModal"
    title="Online room"
    :close="() => onlineLobbyModal = false"
  >
    <div class="flex flex-col items-center justify-center pt-4">
      <div>
        <input
          v-model="onlineCode"
          type="text"
          class="text-input w-44"
        >
        <button
          class="btn-blue ml-5 px-4 py-2 font-bold"
          @click="() => {
            router.push(`/${onlineCode}`)
          }"
        >
          Join
        </button>
      </div>
      <hr class="my-4 w-full">
      <button
        class="btn-blue px-4 py-2 font-bold"
        @click="() => {
          socket.connect()
          socket.emit('create-room', { id:userID, name: store.username })
        }"
      >
        Create Game
      </button>
    </div>
  </Modal>

  <p class="fixed bottom-2 left-4 text-slate-700">
    We use local storage to identify users
  </p>
</template>