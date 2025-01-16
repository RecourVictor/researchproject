<template>
  <TresCanvas clear-color="#82DBC5" :style="{ position: 'static' }" class="maw-w-screen max-h-screen">
    <!-- Camera -->
    <TresPerspectiveCamera :position="[-30, 30, 30]" :look-at="[0, 0, 0]" />

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
import { computed, reactive, ref } from 'vue'
import * as THREE from 'three'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

interface Athlete {
  id: number
  name: string
  roundTime: number
}

const props = defineProps<{
  athletes: Athlete[]
  rounds: number
  isPaused: boolean
}>()

const path = computed(() => {
  const points = [
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
  return points
})

// Reactieve referenties voor atleten
const athleteRefs = reactive(new Map<number, THREE.Object3D>())
const remainingRoundsMap = reactive(new Map<number, number>())

// Gebruik Render Loop
const { onLoop } = useRenderLoop()

// Timer, maak een timer en houd de verstreken tijd bij in seconden en bv 45.44s, wanneeer pauzeer wordt de timer gestopt
const timer = ref(0)
onLoop(() => {
  if (!props.isPaused) {
    timer.value += 1 / 60
  }
})

// Functie voor het bijhouden van resterende rondes voor een atleet op basis van de timer
const updateRemainingRounds = (athlete: Athlete) => {
  const huidigeRonde = Math.floor(timer.value / athlete.roundTime)
  const resterendeRondes = props.rounds - huidigeRonde
  remainingRoundsMap.set(athlete.id, resterendeRondes)
}

// Functie die de beweging van de atleten en het bijhouden van de rondes verzorgt
onLoop(() => {
  if (props.isPaused) return // Stop de simulatie als deze gepauzeerd is

  props.athletes.forEach(athlete => {
    const athleteRef = athleteRefs.get(athlete.id)
    if (athleteRef && path.value.length > 0) {
      const roundTime = athlete.roundTime

      // Normaliseer de tijd over de totale duur van de rondes
      const normalizedTime = (timer.value % roundTime) / roundTime

      // Bereken de indexen van de wegsegmenten op basis van de genormaliseerde tijd
      const pathIndex = Math.floor(normalizedTime * path.value.length)
      const nextIndex = (pathIndex + 1) % path.value.length

      const start = path.value[pathIndex]
      const end = path.value[nextIndex]
      const segmentProgress = (normalizedTime * path.value.length) % 1

      // Stop de beweging als de atleet de finish heeft bereikt
      const remaining = remainingRoundsMap.get(athlete.id)
      if (remaining === undefined || remaining > 0) {
        // Beweeg de atleet over het pad
        athleteRef.position.x = start.x + (end.x - start.x) * segmentProgress
        athleteRef.position.z = start.z + (end.z - start.z) * segmentProgress

        // Bereken de rotatie van de atleet
        const angle = Math.atan2(end.z - start.z, end.x - start.x)
        athleteRef.rotation.y = angle
      }
      updateRemainingRounds(athlete)
    }
  })
})
</script>
