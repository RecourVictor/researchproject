<template>
  <div v-if="athlete" class="text-xl grid grid-cols-5 gap-4">
    <div class="flex items-center">
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
      <p>{{ athlete.nationality.countryName }}</p>
    </div>
    <div class="text-center">
      <p v-if="athlete.gender === 'MALE'">M</p>
      <p v-else>F</p>
    </div>
    <div class="col-span-2">
      <p>{{ athlete.name }} {{ athlete.surname }}</p>
    </div>
    <div class="justify-self-end">
      <div class="flex gap-2">
        <button @click="editAthlete(athlete.id)">
            <Pencil class="text-wa-blue" />
        </button>
        <button @click="deleteAthlete(athlete.id)">
            <Trash class="text-wa-red" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trash, Pencil } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

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

const deleteAthlete = (id: string) => {
    console.log('Delete athlete with id: ' + id)
    window.alert('Delete athlete with id: ' + id)
    window.alert("Not implemented yet")
}
</script>
