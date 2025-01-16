<template>
  <div class="w-[45rem]">
    <div
      class="rounded-t-xl py-3 px-5 bg-gradient-to-r from-wa-orange_light via-wa-orange to-wa-red"
    >
      <h1 class="text-2xl font-bold text-wa-blue">
        {{ props.simulationName }}
      </h1>
    </div>
    <div class="bg-wa-blue py-3 px-5 text-white text-xl opacity-90 flex flex-col gap-2 rounded-b-xl">
      <div
        class="flex algin-center justify-between"
        v-for="(athlete, index) in sortAthletes"
        :key="athlete.id"
      >
        <div class="flex align-center gap-4">
          <p>{{ index + 1 }}</p>
          <div class="w-12 grid place-items-center">
            <img
              class="h-5 w-auto m-auto"
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
        <p>{{ athlete.time }}s</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AthletePerformance } from '@/interfaces/athleteperformance.interface';

const props = defineProps<{
  athletes: AthletePerformance[]
  simulationName: string
}>()

const sortAthletes = [...props.athletes].sort((a, b) => a.time - b.time)
</script>
