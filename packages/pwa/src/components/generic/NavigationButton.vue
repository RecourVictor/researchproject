<template>
  <router-link
    :to="to"
    class="rounded-full text-wa-blue border text-base sm:text-xl border-wa-blue flex items-center gap-2 p-3 md:py-3 md:px-5 transition-all duration-200 hover:bg-wa-blue hover:text-white aspect-square md:aspect-auto"
  >
    <span class="text-xl flex items-center text-wa-orange">
      <slot name="icon" />
    </span>
    <span class="hidden md:block">{{ props.label }}</span> 
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
