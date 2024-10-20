<template>
  <UiPage>
    <template #header>
      <ClientOnly>
        <div class="flex h-full items-center px-4">
          <UiSelect
            :options="availableProvider"
            v-model="currentStorageProvider"
          >
            <template #value="slotProps">
              <NuxtLinkLocale
                :to="{ name: 'folders' }"
                class="flex space-x-2 items-center hover:text-primary"
              >
                <i :class="slotProps.value?.icon"></i>
                <p>{{ slotProps.value?.name }}</p>
              </NuxtLinkLocale>
            </template>

            <template #option="slotProps">
              <div class="flex space-x-2 items-center">
                <i :class="slotProps.option?.icon"></i>
                <div>{{ slotProps.option?.name }}</div>
              </div>
            </template>
          </UiSelect>
          <span
            v-for="(folderId, index) in breadCrumbs.reverse()"
            :key="folderId"
            class="flex items-center space-x-2"
          >
            <UiIcon
              icon="i-[ic--round-keyboard-arrow-right] ml-2"
              class="size-6"
            />
            <UiBreadcrumb
              :to="{ name: 'folders', params: { id: folderId } }"
              :name="getFolderName(folderId)"
            />
          </span>
        </div>
      </ClientOnly>
    </template>

    <div
      :class="{
        'bg-primary/30 border-dashed border-4 border-': isOverDropZone,
      }"
      ref="dropZoneRef"
      @drop="onDrop($event)"
      class="h-full w-fit min-w-full"
    >
      <div>c{{ currentFolderId }}c</div>
      <NuxtPage keepalive />
    </div>
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'files',
  middleware: 'redirect-to-all-files',
});

const route = computed(() => useRoute().path);

const { availableProvider, currentStorageProvider, currentFolderId } =
  useStorageProvider();

const { breadCrumbs, allFolders } = useDirectusFolders();

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
  }
};

const getFolderName = (folderId: string) =>
  allFolders.value.find((folder) => folder.id === folderId)?.name ?? '';

const { files, open, reset, onChange } = useFileDialog({
  //accept: 'image/*', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
});

const { uploadFilesAsync } = useDirectusFiles();

onChange(async (files) => {
  await uploadFilesAsync(files);
});
</script>

<i18n lang="json">
{
  "de": {
    "create": {
      "folder": "Ordner erstellen",
      "file": "Datei erstellen"
    },

    "upload": {
      "folders": "Ordner hochladen",
      "files": "Dateien hochladen"
    }
  },

  "en": {
    "create": {
      "folder": "Create Folder",
      "file": "Create File"
    },
    "upload": {
      "folders": "Upload Folders",
      "files": "Upload Files"
    }
  }
}
</i18n>
