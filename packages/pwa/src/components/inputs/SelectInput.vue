<template>
  <div>
    <label :for="label" class="text-xl mb-2 inline-block" v-if="label">
      {{ label }}
    </label>
    <div class="relative">
      <select
        :id="label"
        :value="modelValue"
        @change="updateValue"
        class="rounded-full border h-[3.125rem] border-wa-blue text-wa-blue px-4 py-3 w-full pr-10 appearance-none"
      >
        <option v-if="firstOption" disabled value="">
          {{ firstOption }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
      <!-- Toevoegen van het dropdown-pijltje icoon van Lucide Vue -->
      <ChevronDown
        class="absolute text-xl right-4 top-1/2 transform -translate-y-1/2 text-wa-orange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

defineProps({
  label: {
    type: String,
    default: '', // Optioneel maken door default waarde te geven
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  firstOption: {
    type: String,
    required: false,
  },
  options: {
    type: Array as () => Array<{
      label: string
      value: string | number
      disabled?: boolean
    }>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

// Bijwerken van de waarde en correct type behouden
const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const rawValue = target.value

  // Controleren of de waarde een getal is
  const value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue)

  emit('update:modelValue', value)
}
</script>
