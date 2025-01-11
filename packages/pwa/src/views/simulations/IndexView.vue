<template>
  <section class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <AppHeading :level="1">Simulaties</AppHeading>
      <SecondaryButton
        :buttonFunction="createAthlete"
        textOnButton="Simulatie toevoegen"
      >
        <template #icon>
          <Plus />
        </template>
      </SecondaryButton>
    </div>
    <div>
      <SearchBar v-model="searchQuery" placeholder="Zoek Atleten..." />
    </div>
    <div v-if="loading">Loading...</div>

    <div v-else class="flex flex-col gap-4">
      <SimulationItem
        v-for="simulatie of searchResult.simulationsBySearchString"
        :key="simulatie.id"
        :simulatie="simulatie"
      />
    </div>
    <div v-if="error">{{ error }}</div>
  </section>
</template>

<script setup lang="ts">
import AppHeading from '@/components/generic/AppHeading.vue'
import SearchBar from '@/components/inputs/SearchBar.vue'
import { useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'
import { GET_SIMULATIONS } from '@/graphql/simulations.query'
import SecondaryButton from '@/components/generic/SecondaryButton.vue'
import { Plus } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import SimulationItem from '@/components/simulations/SimulationItem.vue'

const searchQuery = ref<string>('')

const {
  result: searchResult,
  loading,
  error,
} = useQuery(GET_SIMULATIONS, () => ({
  searchString: searchQuery.value,
}))

console.log(searchResult)

const router = useRouter()

const createAthlete = () => {
  router.push({
    name: 'create-simulation',
  })
}
</script>
