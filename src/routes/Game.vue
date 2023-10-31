<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'

import Keyboard from '../components/Keyboard.vue';
import { store } from '../utils/store';

const router = useRouter()

if (store.word === '') router.push(`/game-select`);

const guessed = ref([])

const displayWord = computed(() => (
  store.word.split('').map(letter => guessed.value.includes(letter.toUpperCase()) ? letter : '_ ').join('')
))

const mistakes = computed(() => (
  guessed.value.reduce((acc, letter) => store.word.toUpperCase().includes(letter) ? acc : acc + 1, 0)
))
</script>

<template>
  <button
    class=""
    @click="() => router.push(`/game-select`)"
  >
    <span class="material-symbols-rounded fixed left-3 top-3 text-4xl font-bold">arrow_back_ios</span>
  </button>

  <img
    :src="'./hangman/' + mistakes + '.png'"
    class="h-80 invert"
  >

  <p class="m-10 whitespace-pre text-3xl font-bold">
    {{ displayWord }}
  </p>

  <Keyboard
    v-if="!(mistakes === 7 || store.word == displayWord)"
    :guessed="guessed"
    @guess="(letter) => guessed.push(letter)"
  />

  <p
    v-if="store.word == displayWord"
    class="text-3xl font-bold text-emerald-600"
  >
    You win!
  </p>
  <p
    v-if="mistakes === 7"
    class="text-3xl font-bold text-rose-600"
  >
    You lose...
  </p>
</template>