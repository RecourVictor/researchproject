<template>
  <section class="space-y-6">
    <GoBackButton />
    <AppHeading :level="1">Atleet bewerken</AppHeading>
    <form
      v-if="athleteResult?.athlete"
      @submit.prevent="handleSubmit"
      class="space-y-5"
    >
      <AppHeading :level="2">Algemene info</AppHeading>
      <div class="space-y-4">
        <div class="grid sm:grid-cols-2 gap-4">
          <TextInput
            label="Voornaam"
            v-model="athleteInput.firstName"
            placeholder="Voornaam"
          />
          <TextInput
            label="Achternaam"
            v-model="athleteInput.lastName"
            placeholder="Achternaam"
          />
        </div>
        <DateInput
          label="Geboortedatum"
          v-model="athleteInput.birthDate"
          placeholder="Geboortedatum"
        />
        <SelectInput
          label="Geslacht"
          v-model="athleteInput.gender"
          :options="genderOptions"
          firstOption="Kies een geslacht"
        />
        <NationalityInput v-model="athleteInput.country" />
      </div>
      <AppHeading :level="2">Persoonlijke records</AppHeading>
      <div>
        <div class="grid grid-cols-4 gap-x-2 md:gap-x-4 mb-4">
          <p class="col-span-2 md:col-span-3 text-xl">Disipline</p>
          <p class="text-xl col-span-2 md:col-span-1">PB</p>
        </div>

        <div
          v-for="(record, index) in recordInput"
          :key="index"
          class="grid grid-cols-4 mt-2 gap-x-2 md:gap-x-4 col-span-4"
        >
          <SelectInput
            class="col-span-2 md:col-span-3"
            v-model="record.disipline"
            :options="disiplineOptions"
            @change="handleRecordChange()"
            firstOption="Kies een disipline"
          />
          <NumberInput
            v-model="record.pb"
            placeholder="Persoonlijk record"
            class="col-span-2 md:col-span-1"
          />
        </div>
      </div>
      <PrimaryButton textOnButton="Atleet bewerken">
        <template #icon>
          <UserRound />
        </template>
      </PrimaryButton>
    </form>
    <!-- Errors -->
    <div v-if="updatethleteError" class="text-wa-red">
      {{ updatethleteError }} - Use the network tab for more info
    </div>
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
import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { GET_DISIPLINES } from '@/graphql/disiplines.query'
import { GET_ALL_ATHLETES, GET_ATHLETE_BY_ID } from '@/graphql/athletes.query'
import NumberInput from '@/components/inputs/NumberInput.vue'
import { GET_ATHLETES } from '@/graphql/athletes.query'
import { UPDATE_ATHLETE } from '@/graphql/athletes.mutation'
import { useRouter, useRoute } from 'vue-router'
import GoBackButton from '@/components/generic/GoBackButton.vue'

const { push } = useRouter()

const route = useRoute()

const athleteId = route.params.slug
const { result: athleteResult, onResult: onAthleteResult } = useQuery(
  GET_ATHLETE_BY_ID,
  {
    id: String(athleteId),
  },
)
const { mutate: updateAthlete, error: updatethleteError } = useMutation(
  UPDATE_ATHLETE,
  {
    refetchQueries: [
      {
        query: GET_ATHLETES,
        variables: { searchString: '' },
      },
      {
        query: GET_ALL_ATHLETES
      }
    ],
  },
)

const athleteInput = ref({
  id: '',
  firstName: '',
  lastName: '',
  birthDate: '',
  country: '',
  gender: '',
})
const recordInput = ref([
  {
    disipline: '',
    pb: '',
  },
])

onAthleteResult(() => {
  if (athleteResult.value?.athlete) {
    athleteInput.value.id = athleteResult.value.athlete.id
    athleteInput.value.firstName = athleteResult.value.athlete.name
    athleteInput.value.lastName = athleteResult.value.athlete.surname
    athleteInput.value.birthDate = formatToDateInput(
      athleteResult.value.athlete.birthDate,
    )
    athleteInput.value.country = athleteResult.value.athlete.nationality.id
    athleteInput.value.gender = athleteResult.value.athlete.gender
    // Vul de records array met de records van de atleet
    recordInput.value = athleteResult.value.athlete.records.map(
      (record: { discipline: { id: string }; PB: number }) => ({
        disipline: record.discipline.id,
        pb: record.PB.toString(),
      }),
    )
    recordInput.value.push({ disipline: '', pb: '' })
  }
})

const formatToDateInput = (isoString: string) => {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Maanden beginnen bij 0
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const genderOptions = [
  { label: 'Man', value: 'MALE' },
  { label: 'Vrouw', value: 'FEAMLE' },
]

// Reactieve variabelen
const disiplineOptions = ref<{ label: string; value: string }[]>([])

// Haal de landen op via GraphQL
const { result, onResult: onInputResult } = useQuery(GET_DISIPLINES)

onInputResult(() => {
  if (result.value?.disiplines) {
    disiplines(result.value.disiplines)
  }
})

interface Disipline {
  id: string
  name: string
}

const disiplines = (fetchedDisiplines: Disipline[]) => {
  const aviableDisiplines = []

  for (const disipline of fetchedDisiplines) {
    const disabled = recordInput.value.some(
      record => record.disipline === disipline.id,
    )
    aviableDisiplines.push({
      label: disipline.name,
      value: disipline.id,
      disabled: disabled,
    })
  }
  disiplineOptions.value = aviableDisiplines
}

const handleSubmit = () => {
  // verwijder de laatste record als deze niet volledig is ingevuld
  if (!recordInput.value[recordInput.value.length - 1].disipline) {
    recordInput.value.pop()
  }

  const records = recordInput.value.map(record => {
    return {
      disiplineId: record.disipline,
      PB: parseFloat(record.pb),
    }
  })

  const athlete = {
    id: athleteInput.value.id,
    name: athleteInput.value.firstName,
    surname: athleteInput.value.lastName,
    birthDate: new Date(athleteInput.value.birthDate).toISOString(),
    gender: athleteInput.value.gender,
    nationalityId: athleteInput.value.country,
    records: records,
  }

  console.log(athlete)

  updateAthlete({
    athleteInput: athlete,
  }).then(() => {
    push({ name: 'athletes' })
  })
}

// Functies voor het toevoegen van nieuwe record velden
const handleRecordChange = () => {
  disiplines(result.value?.disiplines ?? [])
  addNewRecordField()
}

const addNewRecordField = () => {
  const lastRecord = recordInput.value[recordInput.value.length - 1]
  // Controleer of het laatste veld volledig is ingevuld
  if (lastRecord.disipline) {
    recordInput.value.push({ disipline: '', pb: '' })
  }
}
</script>
