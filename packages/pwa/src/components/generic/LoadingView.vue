<template>
  <div
    :class="
      isFullscreen ? 'grid items-center h-screen bg-[#5CBAC8]' : 'grid items-center h-56'
    "
  >
    <div class="text-center">
      <AppHeading :level="2">Even geduld...</AppHeading>
      <p class="text-xl text-wa-blue">We zijn de gegevens aan het ophalen.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeading from './AppHeading.vue'

defineProps({
  isFullscreen: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
