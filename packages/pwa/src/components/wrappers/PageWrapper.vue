<template>
  <NavigationApp />
  <div class="mx-auto px-4 max-w-screen-lg pb-10 bg-red-300 sm:bg-yellow-300 md:bg-pink-300 lg:bg-blue-300 xl:bg-green-300">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NavigationApp from '../generic/NavigationApp.vue'
</script>
