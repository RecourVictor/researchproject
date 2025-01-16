<template>
  <section class="flex flex-col gap-6">
    <AppHeading :level="1">Instellingen</AppHeading>
    <div class="flex flex-col gap-2 text-xl">
      <label>
        <input
          type="checkbox"
          v-model="speed"
          @change="updateSetting('speed', speed)"
        />
        Toon snelheid
      </label>
      <label>
        <input
          type="checkbox"
          v-model="distance"
          @change="updateSetting('distance', distance)"
        />
        Toon afstand
      </label>
      <label>
        <input
          type="checkbox"
          v-model="country"
          @change="updateSetting('country', country)"
        />
        Toon land
      </label>
      <label>
        <input
          type="checkbox"
          v-model="position"
          @change="updateSetting('position', position)"
        />
        Toon positie
      </label>
      <label>
        <input
          type="checkbox"
          v-model="clock"
          @change="updateSetting('clock', clock)"
        />
        Toon klok
      </label>
      <label>
        <input
          type="checkbox"
          v-model="lane"
          @change="updateSetting('lane', lane)"
        />
        Toon baan
      </label>
      <label>
        <input
          type="checkbox"
          v-model="lap_time"
          @change="updateSetting('lap_time', lap_time)"
        />
        Toon ronde tijd
      </label>
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

const speed = ref(false)
const distance = ref(false)
const country = ref(false)
const position = ref(false)
const clock = ref(false)
const lane = ref(false)
const lap_time = ref(false)

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
      } else if (setting.name === 'lane') {
        lane.value = setting.value
      } else if (setting.name === 'lap_time') {
        lap_time.value = setting.value
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
