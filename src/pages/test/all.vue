<template>
  ta
  <UiTable
    :items="[]"
    :columns="columns"
  >
  </UiTable>
  ble
</template>

<script setup lang="ts">
definePageMeta({
  name: 'all',
});

console.log('load allFiles');
const { columns } = storeToRefs(useDirectusFiles());

const { auth } = storeToRefs(useDirectusStore());
const { readFilesAsync } = useDirectusFiles();

//const { readFilesAsync } = useDirectusFiles();

const { data } = await useAsyncData(() => readFilesAsync());
//const items = data.value; */
</script>
