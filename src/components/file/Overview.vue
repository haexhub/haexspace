<template>
  <div class="h-full">
    <LazyUiTableFiles
      v-if="data?.length"
      :items="data"
    >
    </LazyUiTableFiles>

    <FileNoFilesOrFolder v-else />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  folderId: [String, null],
  onlyFiles: Boolean,
});

const { providerFunctions, currentStorageProvider } = useStorageProvider();

const { data, error } = await useAsyncData(
  () => providerFunctions().directoryContentAsync(props.folderId),
  { watch: [currentStorageProvider] }
);
</script>
