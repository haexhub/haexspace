<template>
  <UiPage>
    <template #header>
      <ClientOnly>
        <div class="flex space-x-2 h-full items-center px-4">
          <span
            v-for="(folderId, index) in breadCrumbs.reverse()"
            :key="folderId"
            class="flex items-center"
          >
            <UiBreadcrumb
              :to="{ name: 'folders', params: { id: folderId } }"
              :name="getFolderName(folderId)"
            />
            <UiIcon
              v-if="index < breadCrumbs.length - 1"
              icon="i-[ic--round-keyboard-arrow-right] "
              class="size-6"
            />
          </span>
        </div>
      </ClientOnly>
    </template>
    <div
      :class="{ 'bg-primary': isOverDropZone }"
      ref="dropZoneRef"
      @drop="onDrop($event)"
      class="h-full w-fit min-w-full"
    >
      <NuxtPage keepalive />
    </div>
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'files',
  middleware: 'redirect-to-all-files',
});

const { breadCrumbs, allFolders, currentFolderId } =
  storeToRefs(useFolderStore());

const onFileDrop = async (files: File[] | null = []) => {
  console.log('dropped files', files);
};
const dropZoneRef = ref<HTMLElement>();
const { isOverDropZone } = useDropZone(dropZoneRef, onFileDrop);

const onDrop = (event: DragEvent) => {
  console.log('event drop', event, event?.dataTransfer?.items);

  const items = event?.dataTransfer?.items;
  console.log('type', typeof items);
  for (const item of items ?? []) {
    const fs = item.webkitGetAsEntry();
    console.log('item', fs);
    /* const reader = fs?.createReader();
    console.log('reader', reader);
    reader.readEntries((entry) => {
      console.log('entry', entry);
    }); */
  }
  //files?.forEach(file => file.)
};

const getFolderName = (folderId: string) =>
  allFolders.value.find((folder) => folder.id === folderId)?.name ?? '';

const { files, open, reset, onChange } = useFileDialog({
  //accept: 'image/*', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
});

const { uploadFilesAsync, syncFilesAsync } = useFileStore();

onChange(async (files) => {
  await uploadFilesAsync(files);
  await syncFilesAsync();
});
</script>
