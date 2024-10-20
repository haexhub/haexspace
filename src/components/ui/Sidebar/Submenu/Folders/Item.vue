<template>
  <UiContextMenu :menu="contextMenu">
    <TreeItem
      v-slot="{ isExpanded, handleToggle }"
      :key="item._id"
      :style="{ 'padding-left': `${item.level - 0.5}rem` }"
      v-bind="item.bind"
      class="flex items-center p-2 rounded outline-none focus:ring-primary-focus focus:ring-2 data-[selected]:bg-primary-focus/20 hover:bg-slate-300 dark:hover:bg-slate-600/60 cursor-pointer m-0.5"
      @toggle="
        (event) => {
          event.preventDefault();
          navigateTo(
            useLocaleRoute()({
              name: 'folders',
              params: { folderId: item._id },
            })
          );
        }
      "
    >
      <template v-if="item.hasChildren">
        <UiIcon
          v-if="!isExpanded"
          icon="i-[ph--folder-plus-duotone]"
          class="size-6 bg-primary"
          @click.stop="handleToggle()"
        />
        <UiIcon
          v-else
          icon="i-[ph--folder-open]"
          class="size-6 bg-primary"
          @click.stop="handleToggle()"
        />
      </template>
      <UiIcon
        v-else
        icon="i-[ph--folder-notch-duotone]"
        class="size-6 shrink-0 bg-primary"
      />

      <p class="pl-2 text-nowrap w-full">
        {{ item.value.name }}
      </p>
    </TreeItem>
  </UiContextMenu>
</template>

<script setup lang="ts">
import type { IContextMenuItem } from '~/components/ui/ContextMenu/types';

defineProps({
  item: {
    type: Object as PropType<typeof FlattenedItem<IFolderTree>>,
  },
});

defineEmits<{ select: [id: string] }>();

const { t } = useI18n();

const contextMenu: IContextMenuItem[] = [
  { label: t('folder.download') },
  { label: t('folder.rename'), serperator: true },
  { label: t('folder.trash') },
];
</script>

<i18n lang="json">
{
  "de": {
    "folder": {
      "download": "Herunterladen",
      "rename": "Umbenennen",
      "trash": "Mülleimer"
    }
  },

  "en": {
    "folder": {
      "download": "Download",
      "rename": "Rename",
      "trash": "Trash"
    }
  }
}
</i18n>
