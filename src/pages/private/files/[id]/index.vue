<template>
  <UiTable
    :items="displayFiles"
    :columns="columns"
  >
  </UiTable>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'file',
});

const { displayFiles } = storeToRefs(useFileStore());

const { readFilesAsync, columns } = useFileStore();

const { refresh } = await useAsyncData(async () => {
  displayFiles.value = await readFilesAsync();
});
</script>
