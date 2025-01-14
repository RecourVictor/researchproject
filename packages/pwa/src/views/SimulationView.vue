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
import { shallowRef, watchEffect } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

const athletRef = shallowRef() // Maak een ref voor de atleet

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (athletRef.value) {
    const a = 35 // Semi-major axis
    const b = 20 // Semi-minor axis
    const speed = 0.5

    // Bereken de nieuwe posities
    const x = a * Math.cos(-speed * elapsed)
    const z = b * Math.sin(-speed * elapsed)

    // Stel de positie in
    athletRef.value.position.x = x
    athletRef.value.position.z = z

    // Stel de rotatie in (looprichting)
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
