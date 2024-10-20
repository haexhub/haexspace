<template>
  <UiSidebarSubmenu>
    <UiContextMenu :menu="contextMenu">
      <TreeRoot
        v-slot="{ flattenItems }"
        class="min-w-full w-fit text-slate-800 dark:text-slate-200 rounded-lg p-2 text-sm font-medium flex flex-col"
        :items="data ?? []"
        :get-key="(item) => item.id"
        :default-expanded="breadCrumbs"
      >
        <UiSidebarSubmenuFoldersItem
          v-for="item in flattenItems"
          :key="item._id"
          :item
        >
        </UiSidebarSubmenuFoldersItem>
      </TreeRoot>
    </UiContextMenu>
    <DialogFolderCreate v-model="showDialog" />
  </UiSidebarSubmenu>
</template>

<script setup lang="ts">
import type { IContextMenuItem } from '~/components/ui/ContextMenu/types';
const { t } = useI18n();

const { breadCrumbs } = useDirectusFolders();
const {
  getDirectoryContentAsync,
  currentStorageProvider,
  getDirectoryAsync,
  currentFolderId,
} = useStorageProvider();

const { data } = await useAsyncData(
  'syncFoldersSubmenu',
  () => getDirectoryAsync(currentFolderId.value ?? ''),
  { watch: [currentStorageProvider] }
);

const showDialog = ref(false);

const contextMenu: IContextMenuItem[] = [
  {
    label: t('folder.create'),
    handler: () => {
      showDialog.value = true;
    },
  },
];
</script>

<i18n lang="json">
{
  "de": {
    "allFiles": "Alle Dateien",
    "folder": {
      "create": "Ordner erstellen",
      "rename": "Umbenennen",
      "trash": "Mülleimer"
    }
  },

  "en": {
    "allFiles": "All Files",

    "folder": {
      "create": "Create Folder"
    }
  }
}
</i18n>
