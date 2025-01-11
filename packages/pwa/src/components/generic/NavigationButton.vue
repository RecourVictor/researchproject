<template>
  <router-link
    :to="to"
    class="rounded-full border text-xl border-wa-blue flex items-center gap-2 py-4 px-5 transition-all duration-200 hover:bg-wa-blue hover:text-wa-orange"
  >
    <span class="text-xl flex items-center">
      <slot name="icon" />
    </span>
    <span>{{ props.label }}</span>
  </router-link>
</template>

<script setup lang="ts">
const props = defineProps({
  to: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})
</script>
