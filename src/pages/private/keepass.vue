<template>
  <UiPage>
    {{ folderTree }}
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'keepass',
});

const { readFoldersAsync } = useFolderStore();
const { folderTree, folders } = storeToRefs(useFolderStore());

const { data } = await useAsyncData(() => readFoldersAsync());
folders.value = data.value ?? [];
</script>
