<template>
  <section class="flex flex-col gap-6">
    <AppHeading :level="1">Instellingen</AppHeading>
    <div class="flex flex-col gap-2 text-xl">
      <CheckboxInput v-model="speed" @update:modelValue="updateSetting('speed', speed)">
        <template #default>Toon snelheid</template>
      </CheckboxInput>
      <CheckboxInput v-model="distance" @update:modelValue="updateSetting('distance', distance)">
        <template #default>Toon afstand</template>
      </CheckboxInput>
      <CheckboxInput v-model="country" @update:modelValue="updateSetting('country', country)">
        <template #default>Toon nationaliteit</template>
      </CheckboxInput>
      <CheckboxInput v-model="position" @update:modelValue="updateSetting('position', position)">
        <template #default>Toon positie</template>
      </CheckboxInput>
      <CheckboxInput v-model="clock" @update:modelValue="updateSetting('clock', clock)">
        <template #default>Toon timer</template>
      </CheckboxInput>
      <CheckboxInput v-model="rounds" @update:modelValue="updateSetting('rounds', rounds)">
        <template #default>Toon aantal ronden</template>
      </CheckboxInput>
    </div>
    <!-- Errors -->
    <div v-if="updateError" class="text-wa-red">
      {{ updateError }} - Use the network tab for more info
    </div>
  </section>
</template>

<script setup lang="ts">
import AppHeading from '@/components/generic/AppHeading.vue'
import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { GET_SETTINGS } from '@/graphql/settings.query'
import { UPDATE_SETTING } from '@/graphql/settings.mutation'
import CheckboxInput from '@/components/inputs/CheckboxInput.vue'

const speed = ref(false)
const distance = ref(false)
const country = ref(false)
const position = ref(false)
const clock = ref(false)
const rounds = ref(false)

const { result, onResult: onSettingsResult } = useQuery(
  GET_SETTINGS,
  () => ({}),
)

const { mutate: update, error: updateError } = useMutation(UPDATE_SETTING)

onSettingsResult(() => {
  if (result.value?.settings) {
    for (const setting of result.value.settings) {
      if (setting.name === 'speed') {
        speed.value = setting.value
      } else if (setting.name === 'distance') {
        distance.value = setting.value
      } else if (setting.name === 'country') {
        country.value = setting.value
      } else if (setting.name === 'position') {
        position.value = setting.value
      } else if (setting.name === 'clock') {
        clock.value = setting.value
      } else if (setting.name === 'rounds') {
        rounds.value = setting.value
      }
    }
  }
})

const updateSetting = (name: string, value: boolean) => {
  update({
    name,
    value,
  })
}
</script>
