<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black p-2 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white @dark:bg-secondary-650 p-6 rounded-lg w-96">
      <Heading class="mb-4" :level="2">{{ title }}</Heading>
      <p>{{ message }}</p>
      <div class="flex justify-end mt-4 gap-2">
        <!-- Annuleer-knop -->
        <SecondaryButton @click="cancel" textOnButton="Annuleren">
          <template #icon>
            <X />
          </template>
        </SecondaryButton>
        <!-- Akkoord-knop -->
        <SecondaryButton class="border-wa-red text-wa-red hover:bg-wa-red" @click="confirm" textOnButton="Verwijderen">
          <template #icon> <Trash /> </template
        ></SecondaryButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import Heading from '@/components/generic/AppHeading.vue'
import { Trash, X } from 'lucide-vue-next'
import SecondaryButton from './SecondaryButton.vue'

// Definieer de emitted events
const emit = defineEmits(['closed', 'confirmed', 'cancelled'])

defineProps({
  title: {
    type: String,
    default: 'Bevestiging',
  },
  message: {
    type: String,
    required: true,
  },
})

const isVisible = ref(true)

// Functie om te sluiten zonder actie (Annuleren)
const cancel = () => {
  emit('cancelled')
}

// Functie om akkoord te gaan (Akkoord)
const confirm = () => {
  emit('confirmed')
}
</script>
