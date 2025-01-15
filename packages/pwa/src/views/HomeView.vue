<template>
  <main class="bg-gray-200 h-screen flex justify-center items-center">
    <div class="flex flex-col gap-20 text-wa-blue bg-white p-8 rounded-xl shadow-xl">
      <div class="flex flex-col items-center gap-2">
        <img class="w-56" src="/logo.svg" alt="Logo Simurace" />
        <h1 class="text-5xl font-worldAthleticsHeading">Simurace</h1>
        <p class="font-bold text-xl">Visualiseer, Analiseer, Win!</p>
      </div>
      <div class="flex flex-row gap-4">
        <PrimaryButton
          textOnButton="Simulaties"
          :buttonFunction="goToSimulations"
        >
          <template #icon>
            <Play />
          </template>
        </PrimaryButton>
        <PrimaryButton textOnButton="Atleten" :buttonFunction="getToAthletes">
          <template #icon> <UserRound /> </template>
        </PrimaryButton>
        <PrimaryButton
          textOnButton="Instellingen"
          :buttonFunction="getToSettings"
        >
          <template #icon> <Settings /> </template>
        </PrimaryButton>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/generic/PrimaryButton.vue'
import { Play, UserRound, Settings } from 'lucide-vue-next'

import { useRouter } from 'vue-router'

const router = useRouter()

const goToSimulations = () => {
  router.push({
    name: 'simulations',
  })
}

const getToAthletes = () => {
  router.push({
    name: 'athletes',
  })
}

const getToSettings = () => {
  router.push({
    name: 'settings',
  })
}
</script>
