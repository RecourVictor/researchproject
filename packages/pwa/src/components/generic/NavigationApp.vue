<template>
  <nav class=" text-white p-4 flex justify-between">
    <div class="flex items-center gap-6">
        <img class="h-20" src="/logo.svg" alt="Logo Simurace" />
        <p class="text-5xl text-wa-blue font-worldAthleticsHeading">Simurace</p>
    </div>
    <div>
      <router-link
        :to="{ name: 'athletes' }"
        class=""
        active-class="bg-red"
      >
        Atleten
      </router-link>
    </div>
  </nav>
  <div class="font-worldAthletics">Tekst met WorldAthletics</div>
<h1 class="font-worldAthleticsHeading">Kop met WorldAthleticsHeading</h1>

</template>

<script setup lang="ts"></script>
