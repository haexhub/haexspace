<template>
  <UiPage>
    {{ token }}
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'keepass',
});

const { readAllFoldersAsync } = useFolderStore();
const { folderTree } = storeToRefs(useFolderStore());
const { token } = storeToRefs(useDirectusStore());

await useAsyncData(() => readAllFoldersAsync());
</script>
