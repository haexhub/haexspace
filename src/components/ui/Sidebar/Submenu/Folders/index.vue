<template>
  <UiSidebarSubmenu>
    <TreeRoot
      v-slot="{ flattenItems }"
      class="list-none select-none min-w-full w-fit text-slate-800 rounded-lg p-2 text-sm font-medium flex flex-col"
      :items="folderTree"
      :get-key="(item) => item.id"
      :default-expanded="parentChain"
    >
      <button
        class="p-2 text-left rounded hover:bg-slate-300 flex items-center space-x-2"
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
  </UiSidebarSubmenu>
</template>

<script setup lang="ts">
const { t } = useI18n();

const { syncFoldersAsync } = useFolderStore();
const { folderTree, parentChain } = storeToRefs(useFolderStore());

await useAsyncData(() => syncFoldersAsync());

const onAllFiles = async () => {
  await navigateTo(useLocaleRoute()({ name: 'allFiles' }));
};
</script>

<i18n lang="json">
{
  "de": {
    "allFiles": "Alle Dateien"
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
