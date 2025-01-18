<template>
  <LoadingView v-if="loading" :isFullscreen="true" />

  <main v-else class="relative h-screen overflow-hidden">
    <TimerOverlay
      v-if="isStarted && !isFinished"
      :minutes="formattedTime.minutes"
      :seconds="formattedTime.seconds"
      :hundredths="formattedTime.hundredths"
    />
    <div
      v-if="isStarted && !isFinished"
      class="absolute bottom-6 right-6 flex gap-2"
    >
      <RoundButton :buttonFunction="togglePause">
        <template #icon>
          <Play v-if="isPaused" />
          <Pause v-else />
        </template>
      </RoundButton>
      <RoundButton :buttonFunction="toggleStop">
        <template #icon>
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="12"
              height="16"
              rx="1"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </template>
      </RoundButton>
      <RoundButton :buttonFunction="toggleRestart">
        <template #icon>
          <RotateCcw />
        </template>
      </RoundButton>
    </div>
    <StartSimulation
      v-if="!isStarted"
      @button-click="handleStart"
      :athletes="simulationResult.simulation.athletes"
      :simulationName="simulationResult.simulation.name"
    />
    <FinishSimulation
      v-if="isFinished"
      @button-click="handleRestart"
      :athletes="simulationResult.simulation.athletes"
      :simulationName="simulationResult.simulation.name"
    />
    <SimulationOverlay
      v-if="isStarted && !isFinished"
      :athletes="simulationResult.simulation.athletes"
      :simulationName="simulationResult.simulation.name"
      :rounds="simulationResult.simulation.disipline.rounds"
    />
    <AthleticsTrack
      :athletes="athletes"
      :rounds="simulationResult.simulation.disipline.rounds"
      :isPaused="isPaused"
      @finished="onFinished"
    />
  </main>
</template>

<script setup lang="ts">
import AthleticsTrack from '@/components/model/AthleticsTrack.vue'
import { computed, ref } from 'vue'
import { GET_SIMULATION_BY_ID } from '@/graphql/simulations.query'
import { useQuery } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'
import StartSimulation from '@/components/overlays/StartSimulation.vue'
import FinishSimulation from '@/components/overlays/FinishSimulation.vue'
import SimulationOverlay from '@/components/overlays/SimulationOverlay.vue'
import RoundButton from '@/components/generic/RoundButton.vue'
import { Pause, Play, RotateCcw } from 'lucide-vue-next'
import TimerOverlay from '@/components/overlays/TimerOverlay.vue'
import LoadingView from '@/components/generic/LoadingView.vue'
import type { Simulation } from '@/interfaces/simulation.interface'

// Reactieve variabelen
const isPaused = ref(true)
const isStarted = ref(false)
const isFinished = ref(false)
const timerValue = ref(0)
let timerInterval: number | null = null

const onFinished = (status: boolean) => {
  if (status) {
    togglePause()
    // zet na 3s de isFinished op true
    setTimeout(() => {
      isFinished.value = true
    }, 3000)
  }
}

// Functie om pauzeren/hervatten te schakelen
const togglePause = () => {
  isPaused.value = !isPaused.value

  if (!isPaused.value) {
    // Start de timer
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        timerValue.value += 1
      }, 10)
    }
  } else {
    // Stop de timer
    if (timerInterval) {
      clearInterval(timerInterval as number)
      timerInterval = null
    }
  }
}

// Functie om te herstarten
const toggleRestart = () => {
  console.log('Herstarten')
  clearInterval(timerInterval as number)
  timerValue.value = 0
  isStarted.value = false
  isFinished.value = false
  togglePause()
  // TODO: Reset de atleten hun positie terug naar de start
}

// Functie om te stoppen
const toggleStop = () => {
  isFinished.value = true
  togglePause()
}

// Timer
const formattedTime = computed(() => {
  const totalSeconds = Math.floor(timerValue.value / 100)
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  const hundredths = String(timerValue.value % 100).padStart(2, '0')
  return {
    minutes,
    seconds,
    hundredths,
  }
})

// Herstarten
const handleRestart = () => {
  console.log('Herstarten')
}

// Starten
const handleStart = () => {
  isStarted.value = true
  isFinished.value = false
  // Wacht 3s en start simulatie
  setTimeout(() => {
    togglePause()
  }, 3000)
}

// Atleten
type Athlete = {
  id: string
  totalTime: number
}
const athletes = ref<Athlete[]>([])

const route = useRoute()

const simulationId = route.params.slug
const {
  result: simulationResult,
  onResult: onSimulationResult,
  loading,
} = useQuery(GET_SIMULATION_BY_ID, {
  id: String(simulationId),
})

onSimulationResult(() => {
  if (simulationResult.value && simulationResult.value.simulation) {
    updateAthletes(simulationResult.value.simulation)
  }
})

function updateAthletes(simulation: Simulation) {
    console.log(simulation)

    const rounds = simulation.disipline.rounds
    console.log('Rounds:', rounds)

    athletes.value = simulation.athletes.map(
      (athlete: { athlete: { id: string }; time: number }) => ({
        id: athlete.athlete.id,
        totalTime: athlete.time,
      }),
    )
    console.log('Updated athletes:', athletes.value)
}
</script>
