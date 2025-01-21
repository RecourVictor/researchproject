<template>
  <div
    class="relative flex items-center cursor-pointer max-w-max"
    @click="toggleCheckbox"
  >
    <!-- Verborgen echte checkbox -->
    <input
      type="checkbox"
      :checked="modelValue"
      class="absolute w-0 h-0 opacity-0 peer"
      tabindex="-1"
    />
    <!-- Aangepaste checkbox -->
    <div
      class="flex items-center justify-center w-3.5 h-3.5 border rounded-sm border-wa-blue peer-checked:border-wa-orange peer-checked:bg-wa-orange text-white focus:outline-none focus-visible:ring focus-visible:ring-wa-blue focus-visible:ring-opacity-50"
      tabindex="0"
      @keydown.enter.prevent="toggleCheckbox"
    >
      <svg
        v-if="modelValue"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          fill-rule="evenodd"
          d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586l10.293-10.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <!-- Label naast de checkbox -->
    <div class="ml-2 flex items-center cursor-pointer">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const { modelValue } = toRefs(props)
const emits = defineEmits(['update:modelValue'])

// Functie om de checkbox te toggelen
const toggleCheckbox = () => {
  emits('update:modelValue', !modelValue.value)
}
</script>
