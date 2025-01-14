<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <TresPerspectiveCamera :position="[-15, 25, 30]" />
    <Suspense>
      <GLTFModel path="/models/piste/scene.gltf" draco />
    </Suspense>
    <TresDirectionalLight :intensity="2.5" :position="[5, 10, 5]" />
    <OrbitControls :min-polar-angle="0" :max-polar-angle="Math.PI / 2" :max-distance="75" />
  </TresCanvas>
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
// import { OrbitControls } from '@tresjs/cientos'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

</script>
