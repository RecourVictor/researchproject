<template>
    <div class="relative w-full">
      <input
        type="text"
        :placeholder="placeholder"
        @input="updateModelValue($event)"
        class="rounded-full border border-wa-blue text-wa-blue px-5 py-3 w-full focus:outline-none focus-visible:ring focus-visible:ring-wa-blue focus-visible:ring-opacity-50"
      />
      <!-- Zoekpictogram aan de rechterkant -->
      <span
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-wa-orange"
      >
        <SearchIcon />
      </span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Search as SearchIcon } from 'lucide-vue-next'
  
  // Props om de label, type, placeholder en modelValue door te geven
  defineProps({
    placeholder: {
      type: String,
      default: 'Zoeken...',
    },
  })
  
  // Functie om de modelValue bij te werken
  const emits = defineEmits(['update:modelValue'])
  
  const updateModelValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    const value = target.value
    emits('update:modelValue', value)
  }
  </script>