<script setup>
  import { useSlots } from 'vue'
  const slots = useSlots()
  const props = defineProps({
    title: String,
    close: Function,
    easyClose: Boolean
  })
  
</script>

<template>
  <div
    class="z-100 fixed flex h-screen w-screen flex-col items-center justify-center bg-slate-500/40"
    @click.self="() => {      
      if (props?.easyClose == '') props.close()
    }"
  >
    <div class="min-w-[20em] rounded-lg bg-white px-4 py-3 text-slate-900">
      <div class="flex justify-between border-b-2 pb-1">
        <p class="text-xl font-bold">
          {{ props.title }}
        </p>
        <button
          v-if="close"
          class="material-symbols-rounded"
          @click="props.close"
        >
          close
        </button>
      </div>
      <div class="py-2">
        <slot />
      </div>
      <div
        v-if="slots.buttons"
        class="flex justify-end pt-4"
      >
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>