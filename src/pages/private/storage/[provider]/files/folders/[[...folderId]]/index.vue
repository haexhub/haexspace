<template>
  {{ useRoute().path }} {{ useRoute().params }}
  <UiContextMenu :menu="contextMenu">
    <UiTableFiles
      :items="data"
      @click.right="onRightClick"
    >
    </UiTableFiles>
  </UiContextMenu>

  <UiButton @click="read">Read</UiButton>
  <!-- <DialogFolderCreate v-model="showDialog" /> -->
</template>

<script setup lang="ts">
import type { IContextMenuItem } from '~/components/ui/ContextMenu/types';
definePageMeta({
  name: 'folders',
});

const showDialog = ref(false);
const showContextMenu = ref(true);

const { getDirectoryContentAsync, currentFolderId, currentStorageProvider } =
  useStorageProvider();

const { t } = useI18n();

const contextMenu: IContextMenuItem[] = [
  {
    label: t('create.folder'),
    handler: () => {
      showDialog.value = true;
    },
  },
  {
    label: t('create.file'),
    handler: () => {},
    serperator: true,
  },
  {
    label: t('upload.folders'),
    handler: () => {},
  },
  {
    label: t('upload.files'),
    handler: () => {
      open();
    },
  },
];

const { data, execute } = await useAsyncData(
  `getDirectoryContentAsync:${currentFolderId.value}`,
  () => {
    console.log('???');
    return getDirectoryContentAsync(currentFolderId.value);
  },
  {
    watch: [currentFolderId, currentStorageProvider],
  }
);

watch(
  [currentFolderId, currentStorageProvider],
  () => console.log('watch data', data.value),
  { immediate: true }
);

const trigger = ref<HTMLButtonElement>();

const onRightClick = () => {
  console.log('righjt lcik', trigger.value);
  showContextMenu.value = true;
};

const read = async () => {
  console.log('read');
  await execute;
};
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
