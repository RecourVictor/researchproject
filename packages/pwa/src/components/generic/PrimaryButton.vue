<template>
  <button
    @click="buttonFunction && buttonFunction()"
    class="rounded-full border text-xl border-wa-blue flex items-center gap-2 py-4 px-5 transition-all duration-200 hover:bg-wa-blue hover:text-wa-orange"
  >
    <!-- Slot voor het icoon vóór de tekst -->
    <span class="text-xl flex items-center">
      <slot name="icon" />
    </span>
    <!-- Tekst die wordt weergegeven op de knop -->
    <span>
      {{ textOnButton }}
    </span>
  </button>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

// Define props
defineProps({
  textOnButton: {
    type: String,
    required: true, // The text on the button is required
  },
  buttonFunction: {
    type: Function as PropType<() => void>, // The function is optional
    required: false,
  },
})
</script>
