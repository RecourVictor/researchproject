<template>
  <div v-if="athlete" class="text-xl grid grid-cols-5 gap-4">
    <div class="flex items-center sm:col-span-2 lg:col-span-1">
      <div class="w-12">
        <img
          class="h-5 w-auto m-auto"
          :src="
            'https://flagcdn.com/' +
            athlete.nationality.countryCode.toLowerCase() +
            '.svg'
          "
          alt="Flag"
        />
      </div>
      <p class="hidden sm:block">{{ athlete.nationality.countryName }}</p>
    </div>
    <div class="text-center hidden lg:block">
      <p v-if="athlete.gender === 'MALE'">M</p>
      <p v-else>F</p>
    </div>
    <div class="col-span-3 sm:col-span-2">
      <p>{{ athlete.name }} {{ athlete.surname }}</p>
    </div>
    <div class="justify-self-end">
      <div class="flex gap-2">
        <button class="text-wa-blue hover:text-wa-orange_light transition-all duration-200 focus:outline-none focus-visible:ring focus-visible:ring-wa-orange focus-visible:ring-offset-2" @click="editAthlete(athlete.id)">
          <Pencil />
        </button>
        <button class="text-wa-red hover:text-wa-orange_light transition-all duration-200 focus:outline-none focus-visible:ring focus-visible:ring-wa-orange focus-visible:ring-offset-2" @click="deleteAthlete()">
          <Trash />
        </button>
      </div>
    </div>
  </div>
  <PopupView
    v-if="isPopupVisible"
    title="Bevestiging"
    :message="popupMessage"
    @confirmed="handleConfirmed"
    @cancelled="handleCancelled"
  />
</template>

<script setup lang="ts">
import { Trash, Pencil } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import PopupView from '../generic/PopupView.vue'
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { DELETE_ATHLETE } from '@/graphql/athletes.mutation'
import { GET_ATHLETES } from '@/graphql/athletes.query'

const { mutate: removeAthlete } = useMutation(
  DELETE_ATHLETE,
  {
    refetchQueries: [
      {
        query: GET_ATHLETES,
        variables: { searchString: '' },
      },
    ],
  },
)

const isPopupVisible = ref(false)
const popupMessage = ref('')

const { athlete } = defineProps({
  athlete: Object,
})

const router = useRouter()

const editAthlete = (id: string) => {
  // Navigeren naar de edit pagina met de athlete id
  router.push({
    name: 'athlete',
    params: { slug: id },
  })
}

const deleteAthlete = () => {
  if (athlete) {
    popupMessage.value = 'Weet je zeker dat je ' + athlete.name + ' ' + athlete.surname + ' wilt verwijderen?'
  }
  isPopupVisible.value = true
}

const handleConfirmed = () => {
  isPopupVisible.value = false
  if (athlete) {
    removeAthlete({ id: athlete.id })
  }
};

const handleCancelled = () => {
  isPopupVisible.value = false
};

</script>
