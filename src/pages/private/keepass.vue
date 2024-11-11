<template>
  <UiPage>
    <UiTableFiles :items="data" />
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'keepass',
});

const { currentFolderId, getDirectoryContentAsync } = useStorageProvider();

const { data } = await useAsyncData(() =>
  getDirectoryContentAsync(currentFolderId.value)
);
</script>
