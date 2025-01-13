<template>
  <div>
    <label class="text-xl mb-2 inline-block" :for="label">{{ label }}</label>
    <input
      type="date"
      :id="label"
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateModelValue($event)"
      class="rounded-full border border-wa-blue text-wa-blue px-4 py-3 w-full"
    />
  </div>
</template>
<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const updateModelValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  emits('update:modelValue', value)
}

const emits = defineEmits(['update:modelValue'])
</script>
