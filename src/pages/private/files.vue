<template>
  <UiPage>
    <UiContextMenu :menu="fileMenu">
      <div
        :class="{ 'bg-primary': isOverDropZone }"
        ref="dropZoneRef"
        @drop="onDrop($event)"
        class="h-full"
      >
        <NuxtPage keepalive />
      </div>
    </UiContextMenu>
    <DialogFolderCreate v-model="dialog.folder.create" />
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'files',
  middleware: 'redirect-to-all-files',
});

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

const { dialog, fileMenu } = useContextMenu();
</script>
