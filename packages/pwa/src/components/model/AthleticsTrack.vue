<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <!-- Camera -->
    <TresPerspectiveCamera :position="[-30, 30, 30]" :look-at="[0, 0, 0]" />

    <!-- Laad de atletiekpiste -->
    <Suspense>
      <GLTFModel path="/models/piste/scene.gltf" />
    </Suspense>

    <!-- Atleten -->
    <Suspense v-for="athlete in athletes" :key="athlete.id">
      <TresMesh ref="el => athleteRefs.value.set(athlete.id, el)">
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
import { computed, shallowRef, watchEffect } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

// Props
interface Athlete {
  id: number;
  name: string;
  roundTime: number;
}

const props = defineProps<{
  athletes: Athlete[];
  rounds: number;
}>()

// Ellipse path parameters
const ellipse = {
  a: 18.5, // Grote straal
  b: 9.4, // Kleine straal
  segments: 100, // Aantal punten langs de ellips
}

// Bereken de ellipsvormige route
const path = computed(() => {
  const points = []
  for (let i = 0; i < ellipse.segments; i++) {
    const angle = (2 * Math.PI * i) / ellipse.segments
    const x = ellipse.a * Math.cos(angle)
    const z = ellipse.b * Math.sin(angle)
    points.push({ x, z })
  }
  return points
})

// Refs voor atleten
const athleteRefs = shallowRef(new Map())
const { onLoop } = useRenderLoop()

// Beweeg elke atleet over het pad
onLoop(({ elapsed }) => {
  props.athletes.forEach(athlete => {
    const athleteRef = athleteRefs.value.get(athlete.id)
    if (athleteRef && path.value.length > 0) {
      const totalDuration = athlete.roundTime * props.rounds
      const totalDistance = path.value.length * props.rounds
      const currentProgress = (elapsed % totalDuration) / totalDuration
      const totalSegments = Math.floor(currentProgress * totalDistance)

      const segmentIndex = totalSegments % path.value.length
      const segmentProgress = currentProgress * totalDistance - segmentIndex

      const start = path.value[segmentIndex]
      const end = path.value[(segmentIndex + 1) % path.value.length]

      // Positie interpoleren
      athleteRef.position.x = start.x + (end.x - start.x) * segmentProgress
      athleteRef.position.z = start.z + (end.z - start.z) * segmentProgress

      // Rotatie berekenen
      const deltaX = end.x - start.x
      const deltaZ = end.z - start.z
      const angle = Math.atan2(deltaZ, deltaX)
      athleteRef.rotation.y = -angle
    }
  })
})

// Controleer of alle atleten geladen zijn
watchEffect(() => {
  props.athletes.forEach(athlete => {
    const athleteRef = athleteRefs.value.get(athlete.id)
    if (athleteRef) {
      console.log(`${athlete.name} geladen:`, athleteRef)
    } else {
      console.log(`${athlete.name} nog niet geladen`)
    }
  })
})
</script>
