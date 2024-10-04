<template>
  <UiPage>
    {{ folderTree }}
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'keepass',
});

const { readAllFoldersAsync } = useFolderStore();
const { folderTree } = storeToRefs(useFolderStore());

await useAsyncData(() => readAllFoldersAsync());
</script>
