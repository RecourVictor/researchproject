<template>
  <nav class="p-4 flex justify-between items-center mb-16">
    <div class="flex items-center gap-6">
      <img class="h-10 sm:h-16 lg:h-20" src="/logo.svg" alt="Logo Simurace" />
      <p
        class="text-4xl lg:text-5xl hidden sm:block text-wa-blue font-worldAthleticsHeading"
      >
        Simurace
      </p>
    </div>
    <div class="flex items-center gap-4 sm:gap-6">
      <NavigationButton :to="{ name: 'simulations' }" label="Simulaties">
        <template #icon>
          <Play />
        </template>
      </NavigationButton>
      <NavigationButton :to="{ name: 'athletes' }" label="Atleten">
        <template #icon>
          <UserRound />
        </template>
      </NavigationButton>
      <NavigationButton :to="{ name: 'settings' }" label="Instellingen">
        <template #icon>
          <Settings />
        </template>
      </NavigationButton>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Settings, UserRound, Play } from 'lucide-vue-next'
import NavigationButton from '@/components/generic/NavigationButton.vue'
</script>
