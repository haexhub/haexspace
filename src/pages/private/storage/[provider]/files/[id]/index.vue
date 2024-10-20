<template>
  <UiTable :items="displayFiles"> </UiTable>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'file',
});

const { displayFiles } = storeToRefs(useDirectusFiles());

const { readFilesAsync } = useDirectusFiles();

const { refresh } = await useAsyncData(async () => {
  displayFiles.value = await readFilesAsync();
});
</script>
