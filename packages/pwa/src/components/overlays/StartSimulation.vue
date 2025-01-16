<template>
  <div class="flex flex-col gap-8 items-center w-fit">
    <AthletesOverlay :athletes="athletes" :simulationName="simulationName" />
    <BlueButton textOnButton="Simulatie starten">
      <template #icon>
        <Play />
      </template>
    </BlueButton>
  </div>
</template>

<script setup lang="ts">
import type { AthletePerformance } from '@/interfaces/athleteperformance.interface'
import AthletesOverlay from './AthletesOverlay.vue'
import { Play } from 'lucide-vue-next'
import BlueButton from '../generic/OrangeButton.vue'

defineProps<{
  athletes: AthletePerformance[]
  simulationName: string
}>()
</script>
