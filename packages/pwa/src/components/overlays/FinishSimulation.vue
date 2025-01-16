<template>
  <div class="flex flex-col gap-8 items-center w-fit">
    <AthletesOverlay :athletes="athletes" :simulationName="simulationName" />
    <div class="flex gap-4">
      <BlueButton textOnButton="Herstarten">
      <template #icon>
        <RotateCcw />
      </template>
    </BlueButton>
      <BlueButton textOnButton="Simulaties">
      <template #icon>
        <Play />
      </template>
    </BlueButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AthletePerformance } from '@/interfaces/athleteperformance.interface'
import AthletesOverlay from './AthletesOverlay.vue'
import { Play, RotateCcw } from 'lucide-vue-next'
import BlueButton from '../generic/OrangeButton.vue'

defineProps<{
  athletes: AthletePerformance[]
  simulationName: string
}>()
</script>
