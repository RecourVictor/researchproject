<template>
  <div class="w-screen px-2 sm:px-0 sm:w-[28rem] absolute bottom-6 sm:left-6">
    <div
      class="rounded-t-md py-2 px-3 bg-gradient-to-r from-wa-orange_light via-wa-orange to-wa-red"
    >
      <h1 class="text-base sm:text-xl font-bold text-wa-blue">
        {{ props.simulationName }}
      </h1>
    </div>
    <div
      class="bg-wa-blue py-2 px-3 text-white bg-opacity-90 flex flex-col gap-2 rounded-br-md"
    >
      <div
        class="flex justify-between"
        v-for="(athlete, index) in sortAthletes"
        :key="athlete.id"
      >
        <div class="flex align-center gap-2 sm:gap-4">
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
          <p class="block sm:hidden">
            {{ athlete.athlete.name.charAt(0) }}. {{ athlete.athlete.surname }}
          </p>
          <p class="hidden sm:block">{{ athlete.athlete.name }} {{ athlete.athlete.surname }}</p>
        </div>
        <div class="flex align-center gap-2 sm:gap-4 text-end">
          <p>{{ calculateSpeed(athlete.time) }}<span class="text-xs	sm:text-base">km/h</span></p>
          <p class="w-16">{{ calculateDistance(athlete.time) }}</p>
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
  timer: number
}>()

const sortAthletes = [...props.athletes].sort((a, b) => a.time - b.time)

const calculateSpeed = (totalTime: number) => {
  if (totalTime <= props.timer) {
    return '0'
  } else {
    if (props.timer > 0) {
      const distance = 400 * props.rounds
      return ((distance / totalTime) * 3.6).toFixed(1)
    } else {
      return '0'
    }
  }
}

const calculateDistance = (totalTime: number) => {
  const firstAthleteTime = sortAthletes[0].time
  const currentTime = props.timer

  if (props.timer === 0) {
    return ''
  } else {
    // Controleer of de eerste atleet al gefinisht is
    if (firstAthleteTime === totalTime) {
      return '';
    } else {
      // Bereken de achterstand van de huidige loper
      const timeDifference = firstAthleteTime - totalTime;
      const speed = (400 * props.rounds) / totalTime;

      if (currentTime >= totalTime) {
        // De atleet is gefinisht, totale achterstand is vast
        const totaleAchterstand = timeDifference * speed;
        return totaleAchterstand.toFixed(1) + 'm';
      } else {
        // De atleet loopt nog, bereken de huidige achterstand
        const afgelegdPercentage = (currentTime / totalTime) * 100;
        const totaleAchterstand = timeDifference * speed;
        const huidigeAchterstand = (totaleAchterstand / 100) * afgelegdPercentage;
        return huidigeAchterstand.toFixed(1) + 'm';
      }
    }
  }
}
</script>
