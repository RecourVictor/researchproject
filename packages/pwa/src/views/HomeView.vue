<template>
  <div class="relative h-screen overflow-hidden">
    <AthleticsTrack class="" :athletes="[]" :rounds="0" :isPaused="true" />
  </div>
  <main class="absolute top-0 left-0 backdrop-blur w-screen h-screen flex justify-center items-center px-4">
    <div
      class="flex flex-col gap-10 sm:gap-16 md:gap-20 text-wa-blue bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full sm:w-auto"
    >
      <div class="flex flex-col items-center gap-4">
        <img class="w-36 sm:w-48 md:w-56" src="/logo.svg" alt="Logo Simurace" />
        <h1 class="text-4xl sm:text-5xl font-worldAthleticsHeading">Simurace</h1>
        <p class="font-bold text-lg sm:text-xl">Visualiseer, Analyseer, Win!</p>
      </div>
      <div class="flex flex-row gap-4 justify-center">
        <PrimaryButton
          textOnButton="Simulaties"
          :buttonFunction="goToSimulations"
          :hide-text-small="true"
        >
          <template #icon>
            <Play />
          </template>
        </PrimaryButton>
        <PrimaryButton
          textOnButton="Atleten"
          :buttonFunction="getToAthletes"
          :hide-text-small="true"
        >
          <template #icon> 
            <UserRound /> 
          </template>
        </PrimaryButton>
        <PrimaryButton
          textOnButton="Instellingen"
          :buttonFunction="getToSettings"
          :hide-text-small="true"
        >
          <template #icon> 
            <Settings /> 
          </template>
        </PrimaryButton>
      </div>
    </div>
  </main>
</template>


<script setup lang="ts">
import PrimaryButton from '@/components/generic/PrimaryButton.vue'
import AthleticsTrack from '@/components/model/AthleticsTrack.vue'
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
