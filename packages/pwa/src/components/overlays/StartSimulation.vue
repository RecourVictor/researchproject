<template>
  <div class="flex flex-col gap-8 items-center w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <AthletesOverlay :athletes="athletes" :simulationName="simulationName" />
    <OrangeButton @click="$emit('button-click')" textOnButton="Simulatie starten">
      <template #icon>
        <Play />
      </template>
    </OrangeButton>
  </div>
</template>

<script setup lang="ts">
import type { AthletePerformance } from '@/interfaces/athleteperformance.interface'
import AthletesOverlay from './AthletesOverlay.vue'
import { Play } from 'lucide-vue-next'
import OrangeButton from '../generic/OrangeButton.vue';

defineProps<{
  athletes: AthletePerformance[]
  simulationName: string
}>()

defineEmits<{
  (event: 'button-click'): void
}>()
</script>
