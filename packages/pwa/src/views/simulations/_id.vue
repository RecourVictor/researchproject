<template>
  <section class="space-y-6">
    <GoBackButton />
    <AppHeading :level="1">Simulatie bewerken</AppHeading>
    <form
      v-if="simulationResult?.simulation || !loading"
      @submit.prevent="handleSubmit"
      class="space-y-5"
    >
      <AppHeading :level="2">Algemene info</AppHeading>
      <div class="space-y-4">
        <TextInput
          label="Wedstrijdnaam"
          v-model="simulationInput.name"
          placeholder="Wedsrijdnaam"
        />
        <p v-if="errors.name" class="text-wa-red text-sm">
          {{ errors.name }}
        </p>
        <SelectInput
          class="col-span-3 mt-4"
          label="Disipline"
          v-model="simulationInput.disipline"
          :options="disiplineOptions"
          firstOption="Kies een disipline"
        />
        <p v-if="errors.disipline" class="text-wa-red text-sm">
          {{ errors.disipline }}
        </p>
      </div>
      <AppHeading :level="2">Atleten</AppHeading>
      <div>
        <div class="grid grid-cols-4 gap-x-2 md:gap-x-4 mb-4">
          <p class="col-span-2 md:col-span-3 text-xl">Atleet</p>
          <p class="text-xl col-span-2 md:col-span-1">Te lopen tijd</p>
        </div>
        <div
          v-for="(athleteInput, index) in athletesInput"
          :key="index"
          class="grid grid-cols-4 mt-2 gap-x-2 md:gap-x-4 col-span-4"
        >
          <SelectInput
            class="col-span-2 md:col-span-3"
            v-model="athleteInput.athlete"
            :options="athleteOptions"
            @change="handleAthleteChange()"
            firstOption="Kies een atleet"
          />
          <NumberInput
            v-model="athleteInput.time"
            class="col-span-2 md:col-span-1"
            placeholder="Tijd"
          />
        </div>
        <p v-if="errors.athlete" class="text-wa-red text-sm">
          {{ errors.athlete }}
        </p>
        <p v-if="errors.time" class="text-wa-red text-sm">
          {{ errors.time }}
        </p>
      </div>
      <PrimaryButton textOnButton="Simulatie bewerken">
        <template #icon>
          <Play />
        </template>
      </PrimaryButton>
    </form>
    <LoadingView v-else />
    <!-- Errors -->
    <div v-if="updateSimulationError" class="text-wa-red">
      {{ updateSimulationError }} - Use the network tab for more info
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
import { useRouter, useRoute } from 'vue-router'
import { GET_SIMULATIONS } from '@/graphql/simulations.query'
import { UPDATE_SIMULATION } from '@/graphql/simulations.mutation'
import { GET_SIMULATION_BY_ID } from '@/graphql/simulations.query'
import GoBackButton from '@/components/generic/GoBackButton.vue'
import NumberInput from '@/components/inputs/NumberInput.vue'
import LoadingView from '@/components/generic/LoadingView.vue'

const { push } = useRouter()

const route = useRoute()

const simulationId = route.params.slug
const {
  result: simulationResult,
  loading,
  onResult: onSimulationResult,
} = useQuery(GET_SIMULATION_BY_ID, {
  id: String(simulationId),
})

const { mutate: updateSimulation, error: updateSimulationError } = useMutation(
  UPDATE_SIMULATION,
  {
    refetchQueries: [
      {
        query: GET_SIMULATIONS,
        variables: { searchString: '' },
      },
    ],
  },
)

const simulationInput = ref({
  id: '',
  name: '',
  disipline: '',
})

const athletesInput = ref([
  {
    athlete: '',
    time: '',
  },
])

onSimulationResult(() => {
  if (simulationResult.value && simulationResult.value.simulation) {
    const simulation = simulationResult.value.simulation
    simulationInput.value = {
      id: simulation.id,
      name: simulation.name,
      disipline: simulation.disipline.id,
    }
    athletesInput.value = simulation.athletes.map(
      (athlete: { athlete: { id: string }; time: string }) => ({
        athlete: athlete.athlete.id,
        time: athlete.time,
      }),
    )
    athletesInput.value.push({ athlete: '', time: '' })
  }
})

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

const athletes = (
  fetchedAthletes: { name: string; surname: string; id: string }[],
) => {
  const aviabelAthletes = []

  for (const athlete of fetchedAthletes) {
    const diabled = athletesInput.value.some(
      athleteInput => athleteInput.athlete === athlete.id,
    )
    aviabelAthletes.push({
      label: athlete.name + ' ' + athlete.surname,
      value: athlete.id,
      disabled: diabled,
    })
  }
  athleteOptions.value = aviabelAthletes
}

const errors = ref({
  name: '',
  disipline: '',
  athlete: '',
  time: '',
})

const validateSimulation = () => {
  let isValid = true

  if (!simulationInput.value.name) {
    errors.value.name = 'Wedstrijdnaam is verplicht'
    isValid = false
  } else {
    errors.value.name = ''
  }

  if (!simulationInput.value.disipline) {
    errors.value.disipline = 'Disipline is verplicht'
    isValid = false
  } else {
    errors.value.disipline = ''
  }

  for (let i = 0; i < athletesInput.value.length - 1; i++) {
    if (!athletesInput.value[i].athlete) {
      errors.value.athlete = 'Atleet is verplicht'
      isValid = false
    } else {
      errors.value.athlete = ''
    }

    if (!athletesInput.value[i].time) {
      errors.value.time = 'Tijd is verplicht'
      isValid = false
    } else {
      errors.value.time = ''
    }
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateSimulation()) {
    return
  }

  // verwijder de laatste atleet als deze niet volledig is ingevuld
  if (!athletesInput.value[athletesInput.value.length - 1].athlete) {
    athletesInput.value.pop()
  }

  const athletes = athletesInput.value.map(athlete => ({
    athleteId: athlete.athlete,
    time: parseFloat(athlete.time),
  }))

  const simulation = {
    id: simulationInput.value.id,
    name: simulationInput.value.name,
    disiplineId: simulationInput.value.disipline,
    athletes: athletes,
  }

  updateSimulation({
    simulationInput: simulation,
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
