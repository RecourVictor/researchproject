<template>
    <button
      @click="buttonFunction && buttonFunction()"
      class="rounded-full text-white border text-xl bg-wa-orange border-wa-orange flex items-center gap-2 transition-all duration-200 hover:bg-transparent hover:text-wa-orange max-w-max p-3 md:py-3 md:px-5 aspect-square md:aspect-auto focus:outline-none focus-visible:ring focus-visible:ring-wa-orange focus-visible:ring-opacity-50"
    >
      <!-- Slot voor het icoon vóór de tekst -->
      <span class="flex items-center">
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
  