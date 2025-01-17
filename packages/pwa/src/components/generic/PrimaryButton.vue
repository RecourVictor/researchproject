<template>
  <button
    @click="buttonFunction && buttonFunction()"
    class="rounded-full text-wa-blue border text-xl border-wa-blue flex items-center gap-2 py-3 px-5 transition-all duration-200 hover:bg-wa-blue hover:text-white "
    :class="{'p-3 md:py-3 md:px-5 aspect-square md:aspect-auto': hideTextSmall}"
  >
    <!-- Slot voor het icoon vóór de tekst -->
    <span class="text-xl flex items-center text-wa-orange">
      <slot name="icon" />
    </span>
    <!-- Tekst die wordt weergegeven op de knop -->
    <span :class="{'hidden md:block': hideTextSmall}">
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
  hideTextSmall: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
