<template>
  <UiContextMenu :menu="contextMenu">
    <UiTableFiles
      :items="data"
      @click.right="onRightClick"
    >
    </UiTableFiles>
  </UiContextMenu>
  <DialogFolderCreate v-model="showDialog" />
</template>

<script setup lang="ts">
import type { IContextMenuItem } from '~/components/ui/ContextMenu/types';
definePageMeta({
  name: 'folders',
});

const showDialog = ref(false);
const showContextMenu = ref(true);

const { currentFolderId, allFolders } = storeToRefs(useFolderStore());
const { getFolderContentAsync } = useFolderStore();

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

const { data } = await useAsyncData(
  `syncFolderContents:${currentFolderId.value}`,
  () => getFolderContentAsync(),
  {
    watch: [currentFolderId, allFolders],
  }
);

const trigger = ref<HTMLButtonElement>();
const onRightClick = () => {
  console.log('righjt lcik', trigger.value);
  showContextMenu.value = true;
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
