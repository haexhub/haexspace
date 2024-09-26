<template>
  <UiContextMenu :menu="folderMenu">
    <TreeItem
      v-slot="{ isExpanded, handleToggle }"
      :key="item._id"
      :style="{ 'padding-left': `${item.level - 0.5}rem` }"
      v-bind="item.bind"
      class="flex items-center p-2 rounded outline-none focus:ring-primary-focus focus:ring-2 data-[selected]:bg-primary-focus/20 hover:bg-slate-300 cursor-pointer m-0.5"
      @toggle="
        (event) => {
          event.preventDefault();
          $emit('select', item._id);
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

      <NuxtLinkLocale
        :to="{ name: 'folder', params: { id: item._id } }"
        class="pl-2 text-nowrap w-full"
      >
        {{ item.value.name }}
      </NuxtLinkLocale>
    </TreeItem>
  </UiContextMenu>
</template>

<script setup lang="ts">
defineProps({
  item: {
    type: Object as PropType<typeof FlattenedItem<IFolderTree>>,
  },
});

const { folderMenu } = useContextMenu();
const { currentFolderId } = storeToRefs(useFolderStore());
defineEmits<{ select: [id: string] }>();
</script>
