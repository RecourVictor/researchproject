<template>
  <component :is="headingTag" :class="headingClasses">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  level: {
    type: Number,
    required: true,
    validator: (value: number) => value >= 1 && value <= 5,
  },
})

// Bepaal de HTML-tag op basis van het level
const headingTag = computed(() => `h${props.level}`)

// Bepaal de Tailwind-stijlklassen op basis van het level
const headingClasses = computed(() => {
  switch (props.level) {
    case 1:
      return 'font-worldAthleticsHeading text-wa-blue text-3xl'
    case 2:
      return 'font-worldAthleticsHeading text-wa-blue text-2xl'
    case 3:
      return 'font-worldAthleticsHeading text-wa-blue text-xl'
    case 4:
      return 'font-worldAthleticsHeading text-wa-blue text-lg'
    case 5:
      return 'font-worldAthleticsHeading text-wa-blue text-base'
    default:
      return 'font-worldAthleticsHeading text-wa-blue text-base'
  }
})
</script>
