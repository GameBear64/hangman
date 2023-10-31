<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

import { store } from '../utils/store';

const username = ref(store.username)
const router = useRouter()

</script>

<template>
  <h1 class="text-xl">
    Chose a username
  </h1>
  <input
    v-model="username"
    type="text"
    class="text-input my-4"
  >
  <button
    v-if="username"
    class="btn-blue text-lg"
    @click="() => {
      store.setName(username);
      router.push('/game-select')
    }"
  >
    Next <span class="material-symbols-rounded -mx-1 align-middle">keyboard_arrow_right</span>
  </button>
</template>