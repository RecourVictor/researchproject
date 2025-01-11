<template>
  <nav class="p-4 flex justify-between mb-16">
    <div class="flex items-center gap-6">
      <img class="h-20" src="/logo.svg" alt="Logo Simurace" />
      <p class="text-5xl text-wa-blue font-worldAthleticsHeading">Simurace</p>
    </div>
    <div class="flex items-center gap-6">
      <NavigationButton :to="{ name: 'simulations' }" label="Simulaties">
        <template #icon>
          <Play class="text-wa-orange" />
        </template>
      </NavigationButton>
      <NavigationButton :to="{ name: 'athletes' }" label="Atleten">
        <template #icon>
          <UserRound class="text-wa-orange" />
        </template>
      </NavigationButton>
      <NavigationButton :to="{ name: 'settings' }" label="Instellingen">
        <template #icon>
          <Settings class="text-wa-orange" />
        </template>
      </NavigationButton>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Settings, UserRound, Play } from 'lucide-vue-next'

import NavigationButton from '@/components/generic/NavigationButton.vue'
</script>
