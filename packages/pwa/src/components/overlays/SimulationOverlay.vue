<template>
  <div class="w-[28rem] absolute bottom-6 left-6">
    <div
      class="rounded-t-md py-2 px-3 bg-gradient-to-r from-wa-orange_light via-wa-orange to-wa-red"
    >
      <h1 class="text-xl font-bold text-wa-blue">
        {{ props.simulationName }}
      </h1>
    </div>
    <div
      class="bg-wa-blue py-2 px-3 text-white bg-opacity-90 flex flex-col gap-2 rounded-br-md"
    >
      <div
        class="flex algin-center justify-between"
        v-for="(athlete, index) in sortAthletes"
        :key="athlete.id"
      >
        <div class="flex align-center gap-4">
          <p>{{ index + 1 }}</p>
          <div class="w-6 grid place-items-center">
            <img
              class="h-4 w-auto m-auto"
              :src="
                'https://flagcdn.com/' +
                athlete.athlete.nationality.countryCode.toLowerCase() +
                '.svg'
              "
              alt="Flag"
            />
          </div>
          <p>{{ athlete.athlete.name }} {{ athlete.athlete.surname }}</p>
        </div>
        <div class="flex align-center gap-4">
          <p>{{ calculateSpeed(athlete.time) }}km/h</p>
          <p>+1m</p>
        </div>
      </div>
    </div>
    <div
      class="bg-wa-blue py-2 px-3 text-sm text-wa-orange_light border-t-wa-orange_light border-t opacity-90 rounded-b-md max-w-max"
    >
      <p>{{ props.rounds }} {{ props.rounds <= 1 ? ' ronde' : ' rondes' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AthletePerformance } from '@/interfaces/athleteperformance.interface'

const props = defineProps<{
  athletes: AthletePerformance[]
  simulationName: string
  rounds: number
}>()

const sortAthletes = [...props.athletes].sort((a, b) => a.time - b.time)
console.log(props.athletes)
console.log(props.rounds)

const calculateSpeed = (totalTime: number) => {
  const distance = 400 * props.rounds
  return ((distance / totalTime) * 3.6).toFixed(1)
}


</script>
