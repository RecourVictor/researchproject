<template>
  <button
    @click="goBack"
    class="flex items-center gap font-xs text-wa-orange hover:text-wa-orange_light transition-all duration-200"
  >
    <ChevronLeft class="w-3 h-3"/>
    <span>Ga naar overzicht</span>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>
