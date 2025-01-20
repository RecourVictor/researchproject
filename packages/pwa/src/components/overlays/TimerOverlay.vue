<template>
  <div
    v-if="clock"
    class="flex gap items-end w-fit absolute top-3 left-3 sm:top-6 sm:left-1/2 transform sm:-translate-x-1/2 bg-wa-blue py-2 px-3 sm:py-4 sm:px-6 text-white bg-opacity-90 rounded-md"
  >
    <h1 class="font-worldAthleticsHeading text-3xl sm:text-5xl">
      {{ props.minutes }}:{{ props.seconds }}:{{ props.hundredths }}
    </h1>
    <p class="font-bold text-xl">s</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_SETTINGS } from '@/graphql/settings.query'

const clock = ref(true)

const { result, onResult: onSettingsResult } = useQuery(
  GET_SETTINGS,
  () => ({}),
)

onSettingsResult(() => {
  const settings = result.value?.settings
  if (settings) {
    const clockSetting = settings.find(
      (setting: { name: string }) => setting.name === 'clock',
    )
    if (clockSetting) {
      clock.value = clockSetting.value === true
    }
  }
})

const props = defineProps<{
  minutes: string
  seconds: string
  hundredths: string
}>()
</script>
