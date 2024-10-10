<template>
  <UiSidebarSubmenu>
    <UiContextMenu :menu="contextMenu">
      <TreeRoot
        v-slot="{ flattenItems }"
        class="list-none select-none min-w-full w-fit text-slate-800 dark:text-slate-200 rounded-lg p-2 text-sm font-medium flex flex-col min-h-[50%]"
        :items="folderTree"
        :get-key="(item) => item.id"
        :default-expanded="breadCrumbs"
      >
        <button
          class="p-2 text-left rounded hover:bg-slate-300 dark:hover:bg-slate-600/60 flex items-center space-x-2"
          @click="onAllFiles"
        >
          <UiIcon
            class="size-6 bg-primary"
            icon="i-[ph--files]"
          />
          <span> {{ t('allFiles') }} </span>
        </button>

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

const { folderTree, breadCrumbs } = storeToRefs(useFolderStore());
const { readAllFoldersAsync } = useFolderStore();

const onAllFiles = async () => {
  await navigateTo(useLocaleRoute()({ name: 'filesAll' }));
};

await useAsyncData('syncFoldersSubmenu', async () => readAllFoldersAsync());

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
    "menu": {
      "folder": {
        "create": "Create Folder"
      }
    }
  }
}
</i18n>
