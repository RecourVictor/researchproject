<template>
  <div>
    <label for="land" class="text-xl mb-2 inline-block">Nationaliteit</label>
    <select
      id="land"
      :value="modelValue"
      @change="updateValue"
      class="rounded-full border border-wa-blue text-wa-blue px-4 py-3 w-full"
    >
      <option disabled value="">Selecteer een land</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_COUNTRIES } from '@/graphql/countries.query'

// Reactieve variabelen
const options = ref<{ label: string; value: string }[]>([]); 

// Haal de landen op via GraphQL
const { result } = useQuery(GET_COUNTRIES)

watchEffect(() => {
  if (result.value && result.value.countries) {
    // Vul de opties array met de landen uit het resultaat
    options.value = result.value.countries.map((country: { countryName: string, id: string }) => ({
      label: country.countryName,
      value: country.id,
    }));
  }
});

defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const rawValue = target.value;

  // Controleren of de waarde een getal is
  const value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue);

  emit('update:modelValue', value);
};
</script>
