<template>
  <div>
    <UiTable
      :items="displayFiles"
      :columns="columns"
    >
    </UiTable>
  </div>
</template>

<script setup lang="ts">
const { displayFiles } = storeToRefs(useFileStore());

const { readFilesAsync, columns } = useFileStore();

const { refresh } = await useAsyncData(async () => {
  displayFiles.value = await readFilesAsync();
});
</script>
