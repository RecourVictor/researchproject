<template>
  <main>
    <h1 class="bg-blue-500 text-white">hallo victor recour hier</h1>
    <div v-if="loading">Loading...</div>

    <div v-else>
      <div v-for="athlete of result.athletes" :key="athlete.id">
        <p>{{ athlete.name }}</p>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
  </main>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_ATHLETES } from '@/graphql/athletes.query'

const { result, loading, error } = useQuery(GET_ATHLETES)
</script>
