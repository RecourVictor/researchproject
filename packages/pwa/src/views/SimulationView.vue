<template>
  <AthleticsTrack :athletes="athletes" :rounds="3" />
</template>

<script setup lang="ts">
import AthleticsTrack from '@/components/model/AthleticsTrack.vue'

const athletes = [
  { id: 1, name: 'Usain Bolt', roundTime: 9.5 },
  { id: 2, name: 'Mo Farah', roundTime: 12.3 },
]
</script>
