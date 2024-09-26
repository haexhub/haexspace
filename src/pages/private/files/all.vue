<template>
  <UiTable
    :items="data ?? []"
    :columns="columns ?? []"
  >
  </UiTable>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'allFiles',
});

const { columns } = storeToRefs(useFileStore());
const { readFilesAsync, filesToTable } = useFileStore();

const { data } = await useAsyncData(async () => {
  const files = await readFilesAsync();
  return filesToTable(files);
});
</script>
