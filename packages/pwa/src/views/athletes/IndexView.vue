<template>
  <section class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <AppHeading :level="1">Atleten</AppHeading>
      <SecondaryButton
        :buttonFunction="createAthlete"
        textOnButton="Atleet toevoegen"
      >
        <template #icon>
          <Plus />
        </template>
      </SecondaryButton>
    </div>
    <div>
      <SearchBar v-model="searchQuery" placeholder="Zoek Atleten..." />
    </div>
    <LoadingView v-if="loading" />

    <div v-else class="flex flex-col gap-4">
      <AthleteItem
        v-for="athlete of searchResult.athletessBySearchString"
        :key="athlete.id"
        :athlete="athlete"
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
import { GET_ATHLETES } from '@/graphql/athletes.query'
import AthleteItem from '@/components/athletes/AthleteItem.vue'
import SecondaryButton from '@/components/generic/SecondaryButton.vue'
import { Plus } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import LoadingView from '@/components/generic/LoadingView.vue'

const searchQuery = ref<string>('')

const {
  result: searchResult,
  loading,
  error,
} = useQuery(GET_ATHLETES, () => ({
  searchString: searchQuery.value,
}))

console.log(searchResult)

const router = useRouter()

const createAthlete = () => {
  router.push({
    name: 'create-athlete',
  })
}
</script>
