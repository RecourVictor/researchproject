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
      <GLTFModel
        path="/models/atleet/scene.gltf"
        ref="athlete"
        :position="[10, 0, 0]"
        :scale="0.01"
      />
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
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

const athlete = ref(null) // Ref voor de atleet
</script>
