<template>
  <div>
    <UiTable
      :items="filesAndFolders"
      :columns="columns"
    >
    </UiTable>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'folder',
});

const { readFilesAsync, filesToTable } = useFileStore();
const { columns } = storeToRefs(useFileStore());
const { readFoldersAsync } = useFolderStore();

const getFilesAndFoldersAsync = async (id: string) => {
  try {
    const files = await readFilesAsync({
      filter: { folder: { _eq: id } },
    });
    const filesForTable = files.map((file) => filesToTable);
    const folders = await readFoldersAsync({ filter: { parent: { _eq: id } } });
    console.log('folders', folders);
    const folderForTable = folders.map((folder) => ({
      name: folder.name,
      size: null,
      modified: null,
    }));
    return [...folderForTable, ...filesForTable];
  } catch (error) {
    return [];
  }
};

const route = useRoute();

const { data: filesAndFolders, refresh } = await useAsyncData(() =>
  getFilesAndFoldersAsync(getSingleParam(route.params.id))
);

watch(route, () => refresh());
</script>
