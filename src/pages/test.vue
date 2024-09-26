<template>
  <div>
    test root {{ isDark }}
    <NuxtLinkLocale to="/">Home</NuxtLinkLocale>
    {{ t('test') }}

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'test',
});
const { show, menu } = storeToRefs(useSidebar());
const { isDark } = storeToRefs(useUi());
const { t } = useI18n();
const { getCurrentUserAsync } = useUserStore();

//const { syncFoldersAsync } = useFolderStore();
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
