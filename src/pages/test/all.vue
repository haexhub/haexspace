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
const { columns } = storeToRefs(useFileStore());

const { auth } = storeToRefs(useDirectusStore());
const { readFilesAsync } = useFileStore();

//const { readFilesAsync } = useFileStore();

const { data } = await useAsyncData(() => readFilesAsync());
//const items = data.value; */
</script>
