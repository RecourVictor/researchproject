<template>
  <div v-if="simulatie" class="text-xl grid grid-cols-5 gap-4">
    <div class="col-span-3">
      <p>{{ simulatie.name }}</p>
    </div>
    <div>
      <p>{{ simulatie.disipline.name }}</p>
    </div>
    <div class="justify-self-end">
      <div class="flex gap-2">
        <button @click="playSimulation(simulatie.id)">
          <Play class="text-wa-orange" />
        </button>
        <button @click="editSimulation(simulatie.id)">
          <Pencil class="text-wa-blue" />
        </button>
        <button @click="deleteSimulation(simulatie.id)">
          <Trash class="text-wa-red" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trash, Pencil, Play } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

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

const deleteSimulation = (id: string) => {
  console.log('Delete simulation with id: ' + id)
  window.alert('Delete simulation with id: ' + id)
  window.alert('Not implemented yet')
}

const playSimulation = (id: string) => {
  console.log('Play simulation with id: ' + id)
  window.alert('Play simulation with id: ' + id)
  window.alert('Not implemented yet')
}
</script>
