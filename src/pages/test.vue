<template>
  <div>
    darkMode {{ isDark }}
    <NuxtLinkLocale to="/">Home</NuxtLinkLocale>
    {{ t('test') }}
    <div>
      <UiInput
        v-model="path"
        label="Path"
      />
      <UiButton @click="doSomething">Action</UiButton>
      {{ success }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Command } from '@tauri-apps/plugin-shell';

const success = ref();
const path = ref('/');
const doSomething = async () => {
  try {
    success.value = await Command.create('dufs', [
      '-A',
      `${path.value}`,
    ]).execute();
  } catch (error) {
    success.value = error;
  }
};

definePageMeta({
  name: 'test',
});

const { isDark } = storeToRefs(useUi());
const { t } = useI18n();
</script>

<i18n lang="json">
{
  "de": {
    "test": "deutsch"
  },
  "en": {
    "test": "englisch"
  }
}
</i18n>
