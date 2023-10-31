<script setup>
  if (!localStorage.getItem('hangman-user')) localStorage.setItem('hangman-user', crypto.randomUUID())
</script>

<template>
  <router-view />
</template>