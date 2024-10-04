<template>
  <UiTableFiles :items="files ?? []"> </UiTableFiles>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'filesAll',
});

const { displayFiles } = storeToRefs(useFileStore());
const { syncFilesAsync, filesToTable } = useFileStore();

await useAsyncData(() => syncFilesAsync());
const files = computed(() => filesToTable(displayFiles.value));
</script>
