<template>
    <section class="space-y-6">
      <AppHeading :level="1">Simulatie bewerken</AppHeading>
      <form class="space-y-5">
        <AppHeading :level="2">Algemene info</AppHeading>
        <div class="space-y-4">
          <TextInput
            label="Wedstrijdnaam"
            v-model="name"
            placeholder="Wedsrijdnaam"
          />
          <SelectInput
            class="col-span-3 mt-4"
            label="Disipline"
            v-model="disipline"
            :options="disiplineOptions"
            firstOption="Kies een disipline"
          />
        </div>
        <AppHeading :level="2">Atleten</AppHeading>
        <div class="space-y-4">
          <div class="grid grid-cols-4 gap-x-4">
            <p class="col-span-3 text-xl">Atleet</p>
            <p class="text-xl">Te lopen tijd</p>
            <SelectInput
              class="col-span-3 mt-4"
              v-model="athlete"
              :options="athleteOptions"
              firstOption="Kies een atleet"
            />
            <TextInput
              v-model="time"
              class="mt-4"
              placeholder="Tijd"
            />
            <SelectInput
              class="col-span-3 mt-4"
              v-model="athlete"
              :options="athleteOptions"
              firstOption="Kies een atleet"
            />
            <TextInput
              v-model="time"
              class="mt-4"
              placeholder="Tijd"
            />
          </div>
        </div>
        <PrimaryButton textOnButton="Simulatie bijwerken">
          <template #icon>
            <Play />
          </template>
        </PrimaryButton>
      </form>
    </section>
  </template>
  
  <script setup lang="ts">
  import AppHeading from '@/components/generic/AppHeading.vue'
  import PrimaryButton from '@/components/generic/PrimaryButton.vue'
  import SelectInput from '@/components/inputs/SelectInput.vue'
  import TextInput from '@/components/inputs/TextInput.vue'
  import { Play } from 'lucide-vue-next'
  import { ref, watchEffect } from 'vue'
  import { useQuery } from '@vue/apollo-composable'
  import { GET_DISIPLINES } from '@/graphql/disiplines.query'
  import { GET_ALL_ATHLETES } from '@/graphql/athletes.query'
  
  // Reactieve variabelen
  const disiplineOptions = ref<{ label: string; value: string }[]>([])
  const athleteOptions = ref<{ label: string; value: string }[]>([])
  
  // Haal de landen op via GraphQL
  const { result: resultDisiplines } = useQuery(GET_DISIPLINES)
  const { result: resultAthlets } = useQuery(GET_ALL_ATHLETES)
  
  watchEffect(() => {
    if (resultDisiplines.value && resultDisiplines.value.disiplines) {
      // Vul de opties array met de landen uit het resultaat
      disiplineOptions.value = resultDisiplines.value.disiplines.map(
        (disipline: { id: string; name: string }) => ({
          label: disipline.name,
          value: disipline.id,
        }),
      )
    }
    if (resultAthlets.value && resultAthlets.value.athletes) {
      // Vul de opties array met de landen uit het resultaat
      athleteOptions.value = resultAthlets.value.athletes.map(
        (athlete: { id: string; name: string; surname: string }) => ({
          label: athlete.name + ' ' + athlete.surname,
          value: athlete.id,
        }),
      )
    }
  })
  </script>
  