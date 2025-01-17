<template>
    <div >
      <label :for="label" class="text-xl mb-2 inline-block">
        {{ label }}
      </label>
      <select
        :id="label"
        :value="modelValue"
        @change="updateValue"
        class="rounded-full border h-[3.125rem] border-wa-blue text-wa-blue px-4 py-3 w-full"
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
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    label: {
      type: String,
      default: '',
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