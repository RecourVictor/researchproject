<template>
  <button class="z-1000" @click="togglePause">
    {{ isPaused ? 'Hervatten' : 'Pauzeren' }}
  </button>
  <AthleticsTrack :athletes="athletes" :rounds="5" :isPaused="isPaused" />
</template>

<script setup lang="ts">
import AthleticsTrack from '@/components/model/AthleticsTrack.vue'
import { ref } from 'vue'

// Reactieve boolean voor pauzeren/hervatten
const isPaused = ref(false)

// Functie om pauzeren/hervatten te schakelen
const togglePause = () => {
  isPaused.value = !isPaused.value
}

const athletes = [
  { id: 1, name: 'Usain Bolt', roundTime: 9.5 },
  { id: 2, name: 'Mo Farah', roundTime: 12.3 },
]
</script>
