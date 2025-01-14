<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <TresAmbientLight :intensity="1" />
    <Suspense>
      <GLTFModel path="/models/piste/scene.gltf" draco />
    </Suspense>
    <OrbitControls />
  </TresCanvas>
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
// import { OrbitControls } from '@tresjs/cientos'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

</script>
