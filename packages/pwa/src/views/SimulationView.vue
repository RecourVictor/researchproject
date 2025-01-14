<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <!-- Camera instellen -->
    <TresPerspectiveCamera :position="[-30, 30, 30]" :look-at="[0, 0, 0]" />

    <!-- Laad het model van de atletiekpiste -->
    <Suspense>
      <GLTFModel path="/models/piste/scene.gltf" />
    </Suspense>

    <!-- Atletenmodel toevoegen -->
    <Suspense>
      <TresMesh ref="athletRef">
        <GLTFModel path="/models/atleet/scene.gltf" :scale="0.01" />
      </TresMesh>
    </Suspense>

    <!-- Verlichting toevoegen -->
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

const athletRef = shallowRef() // Maak een ref voor de atleet

const { onLoop } = useRenderLoop()

const ellipse = {
  a: 18.5, // Grote straal
  b: 9.4, // Kleine straal
  segments: 100, // Aantal punten langs de ellips
}

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


onLoop(({ elapsed }) => {
  if (athletRef.value && path.value.length > 0) {
    const pathDuration = 10 // Tijd in seconden om het volledige pad te volgen
    const pathLength = path.value.length
    const timePerSegment = pathDuration / pathLength

    const currentSegment = Math.floor((elapsed % pathDuration) / timePerSegment)
    const segmentProgress = (elapsed % timePerSegment) / timePerSegment

    const start = path.value[currentSegment]
    const end = path.value[(currentSegment + 1) % pathLength]

    // Positie-interpolatie
    athletRef.value.position.x = start.x + (end.x - start.x) * segmentProgress
    athletRef.value.position.z = start.z + (end.z - start.z) * segmentProgress

    // Rotatie berekenen
    const deltaX = end.x - start.x
    const deltaZ = end.z - start.z
    const angle = Math.atan2(deltaZ, deltaX)
    athletRef.value.rotation.y = -angle
  }
})

// Controleer of het model geladen is en log het resultaat
watchEffect(() => {
  if (athletRef.value) {
    console.log('Atleet geladen:', athletRef.value)
  } else {
    console.log('Atleet nog niet geladen')
  }
})
</script>
