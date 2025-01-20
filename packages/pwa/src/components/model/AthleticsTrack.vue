<template>
  <TresCanvas
    clear-color="#5CBAC8"
    :style="{ position: 'static' }"
    class="w-screen h-screen"
  >
    <!-- Camera -->
    <TresPerspectiveCamera
      :position="[-30, 30, 40]"
      :look-at="[0, 0, 0]"
      :zoom="1.8"
    />

    <!-- Laad de atletiekpiste -->
    <Suspense>
      <GLTFModel path="/models/piste/scene.gltf" />
    </Suspense>

    <!-- Atleten -->
    <Suspense v-for="athlete in athletes" :key="athlete.id">
      <TresMesh
        :ref="
          el => athleteRefs.set(athlete.id, el as unknown as THREE.Object3D)
        "
      >
        <GLTFModel path="/models/atleet/scene.gltf" :scale="0.01" />
      </TresMesh>
    </Suspense>

    <!-- Verlichting -->
    <TresDirectionalLight :intensity="2.5" :position="[5, 10, 5]" />
    <TresAmbientLight :intensity="0.5" />

    <!-- OrbitControls -->
    <OrbitControls
      :min-polar-angle="0"
      :max-polar-angle="Math.PI / 2"
      :max-distance="75"
    />
  </TresCanvas>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import * as THREE from 'three'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

interface Athlete {
  id: string
  totalTime: number
  remainingRounds: boolean
}

const props = defineProps<{
  athletes: { id: string; totalTime: number }[]
  rounds: number
  isPaused: boolean
  timer: number
  startIndex: number // Uniforme startpositie
}>()

const emit = defineEmits<{
  (event: 'finished', status: boolean): void
}>()

const path = [
  { x: 10.5, z: 8 },
  { x: 11.5, z: 7.7 },
  { x: 12.5, z: 7.2 },
  { x: 13.5, z: 6.7 },
  { x: 14.5, z: 6 },
  { x: 15.5, z: 5 },
  { x: 16.3, z: 4 },
  { x: 16.8, z: 3 },
  { x: 17.2, z: 2 },
  { x: 17.4, z: 1 },
  { x: 17.4, z: 0 },
  { x: 17.2, z: -1 },
  { x: 17.2, z: -2 },
  { x: 16.8, z: -3 },
  { x: 16.3, z: -4 },
  { x: 15.5, z: -5 },
  { x: 14.5, z: -6 },
  { x: 13.5, z: -7 },
  { x: 12.5, z: -7.5 },
  { x: 11.5, z: -8 },
  { x: 10.5, z: -8 },
  { x: 9.5, z: -8 },
  { x: 8.5, z: -8 },
  { x: 7.5, z: -8 },
  { x: 6.5, z: -8 },
  { x: 5.5, z: -8 },
  { x: 4.5, z: -8 },
  { x: 3.5, z: -8 },
  { x: 2.5, z: -8 },
  { x: 1.5, z: -8 },
  { x: 0.5, z: -8 },
  { x: -0.5, z: -8 },
  { x: -1.5, z: -8 },
  { x: -2.5, z: -8 },
  { x: -3.5, z: -8 },
  { x: -4.5, z: -8 },
  { x: -5.5, z: -8 },
  { x: -6.5, z: -8 },
  { x: -7.5, z: -8 },
  { x: -8.5, z: -8 },
  { x: -9.5, z: -8 },
  { x: -10.5, z: -8 },
  { x: -11.5, z: -7.8 },
  { x: -12.5, z: -7.4 },
  { x: -13.5, z: -7 },
  { x: -14.5, z: -6.3 },
  { x: -15.5, z: -5.4 },
  { x: -16, z: -5 },
  { x: -16.5, z: -4 },
  { x: -17, z: -3 },
  { x: -17.3, z: -2 },
  { x: -17.5, z: -1 },
  { x: -17.5, z: 0 },
  { x: -17.3, z: 1 },
  { x: -17.1, z: 2 },
  { x: -16.8, z: 3 },
  { x: -16.5, z: 4 },
  { x: -16, z: 5 },
  { x: -15, z: 6 },
  { x: -14.7, z: 6.5 },
  { x: -13.5, z: 7 },
  { x: -13, z: 7.5 },
  { x: -12, z: 8 },
  { x: -11, z: 8 },
  { x: -10, z: 8 },
  { x: -9, z: 8 },
  { x: -8, z: 8 },
  { x: -7, z: 8 },
  { x: -6, z: 8 },
  { x: -5, z: 8 },
  { x: -4, z: 8 },
  { x: -3, z: 8 },
  { x: -2, z: 8 },
  { x: -1, z: 8 },
  { x: 0, z: 8 },
  { x: 1, z: 8 },
  { x: 2, z: 8 },
  { x: 3, z: 8 },
  { x: 4, z: 8 },
  { x: 5, z: 8 },
  { x: 6, z: 8 },
  { x: 7, z: 8 },
  { x: 8, z: 8 },
  { x: 9, z: 8 },
  { x: 10, z: 8 },
]

const athleteRefs = reactive(new Map<string, THREE.Object3D>())

const initializedAthletes = computed(() =>
  props.athletes.map(athlete => ({
    ...athlete,
    remainingRounds: true,
  })),
)

// Gebruik Render Loop
const { onLoop } = useRenderLoop()

const updateRemainingRounds = (athlete: Athlete) => {
  if (props.timer >= athlete.totalTime) {
    athlete.remainingRounds = false
  } else {
    athlete.remainingRounds = true
  }
}

onLoop(() => {
  if (props.isPaused) return // Stop de simulatie als deze gepauzeerd is

  let allFinished = true // Voor status van alle atleten

  initializedAthletes.value.forEach(athlete => {
    const athleteRef = athleteRefs.get(athlete.id)
    if (athleteRef && path.length > 0) {
      const totalTime = athlete.totalTime

      // Zorg ervoor dat de timer in synch is met de totale tijd
      const normalizedTime =
        ((props.timer % totalTime) / totalTime) * props.rounds

      // Bereken de startindex en voeg deze toe
      const pathIndex =
        (Math.floor(normalizedTime * path.length) + props.startIndex) %
        path.length // Cyclisch pad
      const nextIndex = (pathIndex + 1) % path.length // Volgend segment cyclisch bepalen

      const start = path[pathIndex]
      const end = path[nextIndex]
      const segmentProgress = (normalizedTime * path.length) % 1

      if (athlete.remainingRounds) {
        allFinished = false

        // Beweeg de atleet als er nog resterende rondes zijn
        athleteRef.position.x = start.x + (end.x - start.x) * segmentProgress
        athleteRef.position.z = start.z + (end.z - start.z) * segmentProgress

        updateRemainingRounds(athlete)
      }
    }
  })

  // Emit een true als alle atleten klaar zijn
  if (allFinished) {
    emit('finished', true)
  }
})
</script>
