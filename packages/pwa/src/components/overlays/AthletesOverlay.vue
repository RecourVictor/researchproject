<template>
  <div class="w-screen px-2 sm:px-8 md:px-0 md:w-[45rem] mx-auto">
    <div
      class="rounded-t-xl py-3 px-5 bg-gradient-to-r from-wa-orange_light via-wa-orange to-wa-red"
    >
      <h1 class="text-xl md:text-2xl font-bold text-wa-blue">
        {{ props.simulationName }}
      </h1>
    </div>
    <div
      class="bg-wa-blue py-3 px-5 text-white sm:text-lg md:text-xl bg-opacity-90 flex flex-col gap-2 rounded-b-xl"
    >
      <div
        class="flex algin-center justify-between"
        v-for="(athlete, index) in sortAthletes"
        :key="athlete.id"
      >
        <div class="flex align-center gap-2 sm:gap-3 md:gap-4">
          <p v-if="position" >{{ index + 1 }}</p>
          <div v-if="country" class="w-6 md:w-12 grid place-items-center">
            <img
              class="h2 md:h-5 w-auto m-auto"
              :src="
                'https://flagcdn.com/' +
                athlete.athlete.nationality.countryCode.toLowerCase() +
                '.svg'
              "
              alt="Flag"
            />
          </div>
          <p class="block sm:hidden">
            {{ athlete.athlete.name.charAt(0) }}. {{ athlete.athlete.surname }}
          </p>
          <p class="hidden sm:block">{{ athlete.athlete.name }} {{ athlete.athlete.surname }}</p>
        </div>
        <p>{{ formatTime(athlete.time) }}s</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AthletePerformance } from '@/interfaces/athleteperformance.interface'
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_SETTINGS } from '@/graphql/settings.query'

const country = ref(false)
const position = ref(false)

const { result, onResult: onSettingsResult } = useQuery(
  GET_SETTINGS,
  () => ({}),
)

onSettingsResult(() => {
  const settings = result.value?.settings
  if (settings) {
    const countrySetting = settings.find(
      (setting: { name: string }) => setting.name === 'country',
    )
    if (countrySetting) {
      country.value = countrySetting.value === true
    }
    const positionSetting = settings.find(
      (setting: { name: string }) => setting.name === 'position',
    )
    if (positionSetting) {
      position.value = positionSetting.value === true
    }
  }
})

const props = defineProps<{
  athletes: AthletePerformance[]
  simulationName: string
}>()

const sortAthletes = [...props.athletes].sort((a, b) => a.time - b.time)

const formatTime = (time: number) => {
  const slicedTime = time.toString().split('.')
  let milliseconds = '00'

  if (slicedTime.length === 2) {
    milliseconds = slicedTime[1].padEnd(2, '0')
  }
  const minutes = Math.floor(Number(slicedTime[0]) / 60)
  const seconds = Number(slicedTime[0]) % 60
  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds}`
  } else {
    return `${seconds}:${milliseconds}`
  }
}
</script>
