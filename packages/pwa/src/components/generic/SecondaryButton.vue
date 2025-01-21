<template>
  <button
    @click="buttonFunction && buttonFunction()"
    class="rounded-full border text-wa-blue border-wa-blue flex items-center gap-1 transition-all duration-200 hover:bg-wa-blue hover:text-white p-2 md:py-2 md:px-5 aspect-square md:aspect-auto focus:outline-none focus-visible:ring focus-visible:ring-wa-blue focus-visible:ring-opacity-50"
  >
    <!-- Slot voor het icoon vóór de tekst -->
    <span class="flex items-center text-wa-orange">
      <slot name="icon" />
    </span>
    <!-- Tekst die wordt weergegeven op de knop -->
    <span class="hidden md:block">
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
