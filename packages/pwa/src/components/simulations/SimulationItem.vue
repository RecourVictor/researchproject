<template>
  <div v-if="simulatie" class="text-xl grid grid-cols-5 gap-x-4">
    <div class="col-span-5 sm:col-span-3">
      <p>{{ simulatie.name }}</p>
    </div>
    <div class="col-span-3 sm:col-span-1 opacity-50 sm:opacity-100">
      <p>{{ simulatie.disipline.name }}</p>
    </div>
    <div class="justify-self-end col-span-2 sm:col-span-1">
      <div class="flex gap-2">
        <button @click="playSimulation(simulatie.id)">
          <Play class="text-wa-orange" />
        </button>
        <button @click="editSimulation(simulatie.id)">
          <Pencil class="text-wa-blue" />
        </button>
        <button @click="deleteSimulation()">
          <Trash class="text-wa-red" />
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
import { Trash, Pencil, Play } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import PopupView from '../generic/PopupView.vue'
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { DELETE_SIMULATION } from '@/graphql/simulations.mutation'
import { GET_SIMULATIONS } from '@/graphql/simulations.query'

const { mutate: removeSimulation } = useMutation(DELETE_SIMULATION, {
  refetchQueries: [
    {
      query: GET_SIMULATIONS,
      variables: { searchString: '' },
    },
  ],
})

const isPopupVisible = ref(false)
const popupMessage = ref('')

const { simulatie } = defineProps({
  simulatie: Object,
})

const router = useRouter()

const editSimulation = (id: string) => {
  // Navigeren naar de edit pagina met de simulation id
  router.push({
    name: 'simulation',
    params: { slug: id },
  })
}

const deleteSimulation = () => {
  if (simulatie) {
    popupMessage.value = `Weet je zeker dat je de simulatie ${simulatie.name} wilt verwijderen?`
    isPopupVisible.value = true
  }
}

const handleConfirmed = () => {
  isPopupVisible.value = false
  if (simulatie) {
    removeSimulation({ id: simulatie.id })
  }
}

const handleCancelled = () => {
  isPopupVisible.value = false
}

const playSimulation = (id: string) => {
  // Navigeren naar de simulation pagina met de simulation id
  router.push({
    name: 'simulatie',
    params: { slug: id },
  })
}
</script>
