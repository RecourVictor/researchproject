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
      :zoom="zoomLevel"
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
        :position="[getStartPosition().x, 0, getStartPosition().z]"
        :rotation="[0, getStartPosition().r * (Math.PI / 180), 0]"
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
      :max-distance="maxDistance"
    />
  </TresCanvas>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import * as THREE from 'three'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
import { ref, watchEffect } from 'vue'

// Breakpoints detecteren
const screenSize = ref('default')

// Camera en OrbitControl instellingen
const zoomLevel = ref(1.8)
const maxDistance = ref(75)

const updateScreenSize = () => {
  if (window.matchMedia('(min-width: 1280px)').matches) {
    screenSize.value = 'xl'
  } else if (window.matchMedia('(min-width: 1024px)').matches) {
    screenSize.value = 'lg'
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    screenSize.value = 'md'
  } else if (window.matchMedia('(min-width: 640px)').matches) {
    screenSize.value = 'sm'
  } else {
    screenSize.value = 'xs'
  }
}

// Update screenSize bij laden en resize
window.addEventListener('resize', updateScreenSize)
updateScreenSize()

// Reactief aanpassen van instellingen
watchEffect(() => {
  if (screenSize.value === 'xl') {
    zoomLevel.value = 1.8
    maxDistance.value = 70
  } else if (screenSize.value === 'lg') {
    zoomLevel.value = 1.3
    maxDistance.value = 60
  } else if (screenSize.value === 'md') {
    zoomLevel.value = 0.8
    maxDistance.value = 45
  } else if (screenSize.value === 'sm') {
    zoomLevel.value = 0.6
    maxDistance.value = 50
  } else if (screenSize.value === 'xs') {
    zoomLevel.value = 0.4
    maxDistance.value = 55
  }
})

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
  { x: 10.5, z: 8, r: 100 },
  { x: 11.5, z: 7.7, r: 110 },
  { x: 12.5, z: 7.2, r: 120 },
  { x: 13.5, z: 6.7, r: 130 },
  { x: 14.5, z: 6, r: 140 },
  { x: 15.5, z: 5, r: 150 },
  { x: 16.3, z: 4, r: 160 },
  { x: 16.8, z: 3, r: 170 },
  { x: 17.2, z: 2, r: 180 },
  { x: 17.4, z: 1, r: 190 },
  { x: 17.4, z: 0, r: 200 },
  { x: 17.2, z: -1, r: 210 },
  { x: 17.2, z: -2, r: 220 },
  { x: 16.8, z: -3, r: 230 },
  { x: 16.3, z: -4, r: 240 },
  { x: 15.5, z: -5, r: 260 },
  { x: 14.5, z: -6, r: 270 },
  { x: 13.5, z: -7, r: 280 },
  { x: 12.5, z: -7.5, r: -90 },
  { x: 11.5, z: -8, r: -90 },
  { x: 10.5, z: -8, r: -90 },
  { x: 9.5, z: -8, r: -90 },
  { x: 8.5, z: -8, r: -90 },
  { x: 7.5, z: -8, r: -90 },
  { x: 6.5, z: -8, r: -90 },
  { x: 5.5, z: -8, r: -90 },
  { x: 4.5, z: -8, r: -90 },
  { x: 3.5, z: -8, r: -90 },
  { x: 2.5, z: -8, r: -90 },
  { x: 1.5, z: -8, r: -90 },
  { x: 0.5, z: -8, r: -90 },
  { x: -0.5, z: -8, r: -90 },
  { x: -1.5, z: -8, r: -90 },
  { x: -2.5, z: -8, r: -90 },
  { x: -3.5, z: -8, r: -90 },
  { x: -4.5, z: -8, r: -90 },
  { x: -5.5, z: -8, r: -90 },
  { x: -6.5, z: -8, r: -90 },
  { x: -7.5, z: -8, r: -90 },
  { x: -8.5, z: -8, r: -85 },
  { x: -9.5, z: -8, r: -80 },
  { x: -10.5, z: -8, r: -75 },
  { x: -11.5, z: -7.8, r: -70 },
  { x: -12.5, z: -7.4, r: -65 },
  { x: -13.5, z: -7, r: -60 },
  { x: -14.5, z: -6.3, r: -50 },
  { x: -15.5, z: -5.4, r: -40 },
  { x: -16, z: -5, r: -30 },
  { x: -16.5, z: -4, r: -20 },
  { x: -17, z: -3, r: -10 },
  { x: -17.3, z: -2, r: 0 },
  { x: -17.5, z: -1, r: 10 },
  { x: -17.5, z: 0, r: 20 },
  { x: -17.3, z: 1, r: 30 },
  { x: -17.1, z: 2, r: 40 },
  { x: -16.8, z: 3, r: 50 },
  { x: -16.5, z: 4, r: 60 },
  { x: -16, z: 5, r: 65 },
  { x: -15, z: 6, r: 70 },
  { x: -14.7, z: 6.5, r: 75 },
  { x: -13.5, z: 7, r: 80 },
  { x: -13, z: 7.5, r: 85 },
  { x: -12, z: 8, r: 90 },
  { x: -11, z: 8, r: 90 },
  { x: -10, z: 8, r: 90 },
  { x: -9, z: 8, r: 90 },
  { x: -8, z: 8, r: 90 },
  { x: -7, z: 8, r: 90 },
  { x: -6, z: 8, r: 90 },
  { x: -5, z: 8, r: 90 },
  { x: -4, z: 8, r: 90 },
  { x: -3, z: 8, r: 90 },
  { x: -2, z: 8, r: 90 },
  { x: -1, z: 8, r: 90 },
  { x: 0, z: 8, r: 90 },
  { x: 1, z: 8, r: 90 },
  { x: 2, z: 8, r: 90 },
  { x: 3, z: 8, r: 90 },
  { x: 4, z: 8, r: 90 },
  { x: 5, z: 8, r: 90 },
  { x: 6, z: 8, r: 90 },
  { x: 7, z: 8, r: 90 },
  { x: 8, z: 8, r: 90 },
  { x: 9, z: 8, r: 90 },
  { x: 10, z: 8, r: 90 },
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
      if (!athlete.remainingRounds) {
        // Als de atleet klaar is, zet hem op de finishpositie
        const finishPosition = path[path.length - 1]
        athleteRef.position.x = finishPosition.x
        athleteRef.position.z = finishPosition.z
        athleteRef.rotation.y = finishPosition.r * (Math.PI / 180) // Laatste rotatie
        return
      }

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

        let startRotation = start.r * (Math.PI / 180)
        let endRotation = end.r * (Math.PI / 180)

        // Zorg ervoor dat de rotatie de kortste weg neemt
        if (Math.abs(endRotation - startRotation) > Math.PI) {
          if (endRotation > startRotation) {
            startRotation += 2 * Math.PI
          } else {
            endRotation += 2 * Math.PI
          }
        }

        // Interpoleer de rotatie
        athleteRef.rotation.y =
          startRotation + (endRotation - startRotation) * segmentProgress

        updateRemainingRounds(athlete)
      }
    }
  })

  // Controleer of alle atleten klaar zijn
  if (allFinished) {
    emit('finished', true)
  }
})

const getStartPosition = () => {
  const pathIndex = props.startIndex % path.length
  return path[pathIndex]
}
</script>
