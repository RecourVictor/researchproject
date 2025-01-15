<template>
  <main v-if="loading">
    <p>Loading...</p>
  </main>

  <main v-else>
    <button class="z-1000" @click="togglePause">
      {{ isPaused ? 'Hervatten' : 'Pauzeren' }}
    </button>
    <AthleticsTrack :athletes="athletes" :rounds="2" :isPaused="isPaused" />
  </main>
</template>

<script setup lang="ts">
import AthleticsTrack from '@/components/model/AthleticsTrack.vue'
import { ref } from 'vue'
import { GET_SIMULATION_BY_ID } from '@/graphql/simulations.query'
import { useQuery } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'

// Reactieve boolean voor pauzeren/hervatten
const isPaused = ref(true)

// Functie om pauzeren/hervatten te schakelen
const togglePause = () => {
  isPaused.value = !isPaused.value
}

// const athletes = [
//   { id: 1, roundTime: 30.55 },
//   { id: 2, roundTime: 50.30 },
// ]
const athletes = ref([])

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
    console.log(simulationResult.value.simulation)

    const rounds = simulationResult.value.simulation.disipline.rounds
    console.log('Rounds:', rounds)

    athletes.value = simulationResult.value.simulation.athletes.map(
      (athlete: { athleteId: string; time: number }) => ({
        id: athlete.athleteId,
        roundTime: athlete.time / rounds,
      }),
    )
    console.log('Updated athletes:', athletes.value)

  }
})
</script>
