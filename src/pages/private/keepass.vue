<template>
  <UiPage>
    <UiTableFiles :items="data" />
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'keepass',
});

const { providerFunctions } = useStorageProvider();

const { data } = await useAsyncData(() =>
  providerFunctions().directoryContentAsync()
);
</script>
