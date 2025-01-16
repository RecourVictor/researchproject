<template>
  <button
    @click="buttonFunction && buttonFunction()"
    class="rounded-full w-14 h-14 text-wa-orange text-3xl transition-all duration-200 bg-wa-blue hover:text-white grid place-items-center"
  >
    <slot name="icon" />
  </button>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

// Define props
defineProps({
  buttonFunction: {
    type: Function as PropType<() => void>, // The function is optional
    required: false,
  },
})
</script>
