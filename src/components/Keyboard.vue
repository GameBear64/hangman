<script setup>

  const emit = defineEmits(['guess'])
  const props = defineProps({
    guessed: {
      type: Array,
      default() {
        return []
      }
    }
  })

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' '];

</script>

<template>
  <div class="flex w-6/12 flex-wrap justify-center">
    <button
      v-for="letter in letters"
      :key="letter"
      class="m-1 rounded-md border-2 bg-cyan-500 px-4 py-2 font-bold"
      :class="{ 'border-slate-400 bg-slate-500': props.guessed.includes(letter) }"
      @click="emit('guess', letter)"
    >
      {{ letter == ' ' ? '[Space]' : letter }}
    </button>
  </div>
</template>