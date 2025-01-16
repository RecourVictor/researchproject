<template>
  <div
    class="flex gap items-end w-fit absolute top-6 left-1/2 transform -translate-x-1/2 bg-wa-blue py-4 px-6 text-white bg-opacity-90 rounded-md"
  >
    <h1 class="font-worldAthleticsHeading text-5xl">
      {{ props.minutes }}:{{ props.seconds }}:{{ props.hundredths }}
    </h1>
    <p class="font-bold text-xl">s</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  minutes: string
  seconds: string
  hundredths: string
}>()
</script>
