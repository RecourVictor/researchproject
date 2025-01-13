<template>
  <NavigationApp />
  <div class="mx-auto px-4 max-w-screen-lg pb-10">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NavigationApp from '../generic/NavigationApp.vue'
</script>
