<template>
  <section class="space-y-6">
    <AppHeading :level="1">Atleet toevoegen</AppHeading>
    <form class="space-y-5">
      <AppHeading :level="2">Algemene info</AppHeading>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <TextInput
            label="Voornaam"
            v-model="firstName"
            placeholder="Voornaam"
          />
          <TextInput
            label="Achternaam"
            v-model="lastName"
            placeholder="Achternaam"
          />
        </div>
        <DateInput
          label="Geboortedatum"
          v-model="birthDate"
          placeholder="Geboortedatum"
        />
        <SelectInput
          label="Geslacht"
          v-model="gender"
          :options="genderOptions"
          firstOption="Kies een geslacht"
        />
        <NationalityInput v-model="nationality" />
      </div>
      <AppHeading :level="2">Persoonlijke records</AppHeading>
      <div class="space-y-4">
        <div class="grid grid-cols-4 gap-x-4">
          <p class="col-span-3 text-xl">Disipline</p>
          <p class="text-xl">PB</p>
          <SelectInput
            class="col-span-3 mt-4"
            v-model="disipline"
            :options="disiplineOptions"
            firstOption="Kies een disipline"
          />
          <TextInput v-model="pb" class="mt-4" placeholder="Persoonlijk record" />
          <SelectInput
            class="col-span-3 mt-4"
            v-model="disipline"
            :options="disiplineOptions"
            firstOption="Kies een disipline"
          />
          <TextInput v-model="pb" class="mt-4" placeholder="Persoonlijk record" />
        </div>
      </div>
      <PrimaryButton textOnButton="Atleet toevoegen">
        <template #icon>
          <UserRound />
        </template>
      </PrimaryButton>
    </form>
  </section>
</template>

<script setup lang="ts">
import AppHeading from '@/components/generic/AppHeading.vue'
import PrimaryButton from '@/components/generic/PrimaryButton.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import NationalityInput from '@/components/inputs/NationalityInput.vue'
import SelectInput from '@/components/inputs/SelectInput.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import { UserRound } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_DISIPLINES } from '@/graphql/disiplines.query'

const genderOptions = [
  { label: 'Man', value: 'MALE' },
  { label: 'Vrouw', value: 'FEMALE' },
]

// Reactieve variabelen
const disiplineOptions = ref<{ label: string; value: string }[]>([]); 

// Haal de landen op via GraphQL
const { result } = useQuery(GET_DISIPLINES)

watchEffect(() => {
  if (result.value && result.value.disiplines) {
    // Vul de opties array met de landen uit het resultaat
    disiplineOptions.value = result.value.disiplines.map((disipline: { id: string, name: string }) => ({
      label: disipline.name,
      value: disipline.id,
    }));
  }
});
</script>
