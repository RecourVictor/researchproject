<template>
  <section class="space-y-6">
    <AppHeading :level="1">Simulatie toevoegen</AppHeading>
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <AppHeading :level="2">Algemene info</AppHeading>
      <div class="space-y-4">
        <TextInput
          label="Wedstrijdnaam"
          v-model="simulationInput.name"
          placeholder="Wedsrijdnaam"
        />
        <SelectInput
          class="col-span-3 mt-4"
          label="Disipline"
          v-model="simulationInput.disipline"
          :options="disiplineOptions"
          firstOption="Kies een disipline"
        />
      </div>
      <AppHeading :level="2">Atleten</AppHeading>
      <div class="space-y-4">
        <div class="grid grid-cols-4 gap-x-4">
          <p class="col-span-3 text-xl">Atleet</p>
          <p class="text-xl">Te lopen tijd</p>
          <div
            v-for="(athleteInput, index) in athletesInput"
            :key="index"
            class="grid grid-cols-4 gap-x-4 col-span-4"
          >
            <SelectInput
              class="col-span-3 mt-4"
              v-model="athleteInput.athlete"
              :options="athleteOptions"
              @change="handleAthleteChange()"
              firstOption="Kies een atleet"
            />
            <TextInput
              v-model="athleteInput.time"
              class="mt-4"
              placeholder="Tijd"
            />
          </div>
        </div>
      </div>
      <PrimaryButton textOnButton="Simulatie toevoegen">
        <template #icon>
          <Play />
        </template>
      </PrimaryButton>
    </form>
    <!-- Errors -->
    <div v-if="addSimulationError" class="text-wa-red">
      {{ addSimulationError }} - Use the network tab for more info
    </div>
  </section>
</template>

<script setup lang="ts">
import AppHeading from '@/components/generic/AppHeading.vue'
import PrimaryButton from '@/components/generic/PrimaryButton.vue'
import SelectInput from '@/components/inputs/SelectInput.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import { Play } from 'lucide-vue-next'
import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { GET_DISIPLINES } from '@/graphql/disiplines.query'
import { GET_ALL_ATHLETES } from '@/graphql/athletes.query'
import { useRouter } from 'vue-router'
import { GET_SIMULATIONS } from '@/graphql/simulations.query'
import { CREATE_SIMULATION } from '@/graphql/simulations.mutation'

const { push } = useRouter()

const { mutate: createSimulations, error: addSimulationError } = useMutation(
  CREATE_SIMULATION,
  {
    refetchQueries: [
      {
        query: GET_SIMULATIONS,
        variables: { searchString: '' },
      },
    ],
  },
)

// Reactieve variabelen
const disiplineOptions = ref<{ label: string; value: string }[]>([])
const athleteOptions = ref<{ label: string; value: string }[]>([])

// Haal de landen op via GraphQL
const { result: disiplineResult, onResult: onDisiplinesResult } =
  useQuery(GET_DISIPLINES)
const { result: athleteResult, onResult: onAthletesResult } =
  useQuery(GET_ALL_ATHLETES)

onDisiplinesResult(() => {
  if (disiplineResult.value && disiplineResult.value.disiplines) {
    disiplines(disiplineResult.value.disiplines)
  }
})

const disiplines = (fetchedDisiplines: { name: string; id: string }[]) => {
  disiplineOptions.value = fetchedDisiplines.map(disipline => ({
    label: disipline.name,
    value: disipline.id,
  }))
}

onAthletesResult(() => {
  if (athleteResult.value && athleteResult.value.athletes) {
    athletes(athleteResult.value.athletes)
  }
})

const athletes = (fetchedAthletes: { name: string; id: string }[]) => {
  const aviabelAthletes = []

  for (const athlete of fetchedAthletes) {
    const diabled = athletesInput.value.some(
      athleteInput => athleteInput.athlete === athlete.id,
    )
    aviabelAthletes.push({
      label: athlete.name,
      value: athlete.id,
      disabled: diabled,
    })
  }
  athleteOptions.value = aviabelAthletes
}

const simulationInput = ref({
  name: '',
  disipline: '',
})

const athletesInput = ref([
  {
    athlete: '',
    time: '',
  },
])

const handleSubmit = () => {
  // verwijder de laatste atleet als deze niet volledig is ingevuld
  if (!athletesInput.value[athletesInput.value.length - 1].athlete) {
    athletesInput.value.pop()
  }

  const athletes = athletesInput.value.map(athlete => ({
    athleteId: athlete.athlete,
    time: parseFloat(athlete.time),
  }))

  const simulation = {
    name: simulationInput.value.name,
    disiplineId: simulationInput.value.disipline,
    athletes: athletes,
  }

  console.log(simulation)

  createSimulations({ 
    simulationInput: simulation 
  }).then(() => {
    push({ name: 'simulations' })
  })
}

// Functies voor het toevoegen van nieuwe atleet velden
const handleAthleteChange = () => {
  athletes(athleteResult.value?.athletes ?? [])
  addNewRecordField()
}

const addNewRecordField = () => {
  const lastRecord = athletesInput.value[athletesInput.value.length - 1]
  // Controleer of het laatste veld volledig is ingevuld
  if (lastRecord.athlete) {
    athletesInput.value.push({ athlete: '', time: '' })
  }
}
</script>
