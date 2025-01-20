<template>
  <div
    class="flex flex-col gap-8 items-center w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <AthletesOverlay :disciplineId="disciplineId" :athletes="athletes" :simulationName="simulationName" />
    <div class="flex gap-4">
      <OrangeButton @click="$emit('button-click')" textOnButton="Herstarten">
        <template #icon>
          <RotateCcw />
        </template>
      </OrangeButton>
      <OrangeButton :buttonFunction="goToSimulations" textOnButton="Simulaties">
        <template #icon>
          <Play />
        </template>
      </OrangeButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AthletePerformance } from '@/interfaces/athleteperformance.interface'
import AthletesOverlay from './AthletesOverlay.vue'
import { Play, RotateCcw } from 'lucide-vue-next'
import OrangeButton from '../generic/OrangeButton.vue'
import { useRouter } from 'vue-router'

defineProps<{
  athletes: AthletePerformance[]
  simulationName: string
  disciplineId: string
}>()

defineEmits<{
  (event: 'button-click'): void
}>()

const router = useRouter()

const goToSimulations = () => {
  router.push({
    name: 'simulations',
  })
}
</script>
