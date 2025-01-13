<template>
  <section class="space-y-6">
    <AppHeading :level="1">Atleet toevoegen</AppHeading>
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <AppHeading :level="2">Algemene info</AppHeading>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
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
      <div class="space-y-4">
        <div class="grid grid-cols-4 gap-x-4">
          <p class="col-span-3 text-xl">Disipline</p>
          <p class="text-xl">PB</p>
          <div
            v-for="(record, index) in recordInput"
            :key="index"
            class="grid grid-cols-4 gap-x-4 col-span-4"
          >
            <SelectInput
              class="col-span-3"
              v-model="record.disipline"
              :options="disiplineOptions"
              @change="handleRecordChange()"
              firstOption="Kies een disipline"
            />
            <NumberInput v-model="record.pb" placeholder="Persoonlijk record" />
          </div>
        </div>
      </div>
      <PrimaryButton textOnButton="Atleet toevoegen">
        <template #icon>
          <UserRound />
        </template>
      </PrimaryButton>
    </form>
    <!-- Errors -->
    <div v-if="addAthleteError" class="text-wa-red">
      {{ addAthleteError }} - Use the network tab for more info
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
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_DISIPLINES } from '@/graphql/disiplines.query'
import NumberInput from '@/components/inputs/NumberInput.vue'
import { GET_ATHLETES } from '@/graphql/athletes.query'
import { CREATE_ATHLETE } from '@/graphql/athletes.mutation'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const { mutate: createAthlete, error: addAthleteError } = useMutation(
  CREATE_ATHLETE,
  {
    refetchQueries: [
      {
        query: GET_ATHLETES,
        variables: { searchString: '' },
      },
    ],
  },
)

const genderOptions = [
  { label: 'Man', value: 'MALE' },
  { label: 'Vrouw', value: 'FEMALE' },
]

// Reactieve variabelen
const disiplineOptions = ref<{ label: string; value: string }[]>([])

// Haal de landen op via GraphQL
const { result, onResult: onInputResult } = useQuery(GET_DISIPLINES)

onInputResult(() => {
  if (result.value?.disiplines){
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

const athleteInput = ref({
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
    name: athleteInput.value.firstName,
    surname: athleteInput.value.lastName,
    birthDate: new Date(athleteInput.value.birthDate).toISOString(),
    gender: athleteInput.value.gender,
    nationalityId: athleteInput.value.country,
    records: records,
  }

  console.log(athlete)

  createAthlete({
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
