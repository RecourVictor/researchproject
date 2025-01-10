<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between">
    <div>
        <img src="../../../public/logo.svg" alt="Logo Simurace" />
        <p>Simurace</p>
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
</template>

<script setup lang="ts"></script>
