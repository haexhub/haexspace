<template>
  <div
    class="rounded-lg shadow-md min-h-full min-w-full"
    @keyup.delete="onDelete"
  >
    <table
      class="min-w-full text-left border-collapse relative"
      ref="table"
    >
      <thead class="">
        <UiTableColumns>
          <UiTableColumn
            v-for="(column, index) in columns"
            :class="{ 'sticky left-0 z-10 ': index === 0 }"
          >
            {{ column.label }}
          </UiTableColumn>
        </UiTableColumns>
      </thead>

      <tbody class="">
        <UiContextMenu
          v-for="item in items"
          :menu="contextMenu"
          :context="item"
        >
          <UiTableRow
            ref="row"
            :item
            :is-selected="isSelected(item)"
            v-model="selectedItems"
            @dblclick="onDbClick(item)"
            @click.exact="onSelect(item)"
            @click.ctrl.exact="onSelectMultiple(item)"
          >
            <UiTableItem
              v-for="(column, index) in columns"
              :class="{
                'sticky left-0 z-10': index === 0,
              }"
            >
              <div class="flex items-center">
                <UiIcon
                  v-if="index === 0"
                  :icon="getItemIcon(item)"
                  class="size-4 mr-1 text-orange-300"
                />
                <span class="">
                  {{
                    column.formatter
                      ? column.formatter(item?.[column.prop])
                      : item?.[column.prop]
                  }}
                </span>
              </div>
            </UiTableItem>
          </UiTableRow>
        </UiContextMenu>
      </tbody>
    </table>

    <DialogFileDelete v-model="showDialog.file.delete" />
  </div>
</template>

<script setup lang="ts">
import { type ITableFile, type ITableFileColumn } from './table';

defineProps({
  items: {
    type: Array as PropType<ITableFile[] | null>,
    default: () => [],
  },
});

const showDialog = reactive({
  file: {
    delete: false,
  },
});
const table = ref<HTMLElement | null>(null);
const row = ref<HTMLElement | null>(null);

const { selectedItems } = useTable();

onClickOutside(table, (event) => (selectedItems.value = []));

const { providerFunctions } = useStorageProvider();
const onDbClick = async (item: ITableFile) => {
  console.log('dbclick', item);
  if (item.type === 'folder') {
    await providerFunctions().navigateToDirectoryAsync(item);
    //navigateToDirectoryAsync(currentStorageProvider.value?.slug);
  }
  //await navigateTo(localeRoute({ name: 'folders', params: { id: item.id } }));
};

const onDelete = () => {
  console.log('remove', selectedItems.value);
};

const isSelected = (item: ITableFile) =>
  selectedItems.value?.some((_item) => _item.id === item.id);

const onSelect = (item: ITableFile) => {
  if (isSelected(item)) {
    selectedItems.value = [];
  } else {
    selectedItems.value = [item];
  }
};

const onSelectMultiple = (item: ITableFile) => {
  if (isSelected(item)) {
    selectedItems.value = selectedItems.value.filter(
      (selectedItem) => selectedItem.id !== item.id
    );
  } else {
    selectedItems.value = [...selectedItems.value, item];
  }
};

const { t, locale } = useI18n();
const columns = computed<ITableFileColumn[]>(() => {
  return [
    {
      prop: 'name',
      label: t('column.name'),
    },
    {
      prop: 'size',
      label: t('column.size'),
      formatter: (item: string) => readableFileSize(item),
    },
    { prop: 'type', label: t('column.type') },
    {
      prop: 'modified',
      label: t('column.modified_at'),
      formatter: (item?: string | null) => {
        //console.log('locale', locale.value);
        if (item) {
          return new Date(item).toLocaleDateString(locale.value, {
            dateStyle: 'short',
          });
        }
        return item;
      },
    },
  ];
});

const { deleteFileAsync } = useDirectusFiles();
const contextMenu = [
  {
    label: t('contextMenu.delete'),
    handler: async (item: ITableFile) => {
      if (item.type === 'folder') {
      } else {
        console.log('remove', item);
        await deleteFileAsync(item.id);
      }
    },
  },
];

const getItemIcon = (item: ITableFile) => {
  const type = item.type;
  if (type && itemIcons.has(type)) {
    return itemIcons.get(type);
  }
  return itemIcons.get('file');
};

const itemIcons = new Map([
  ['application/pdf', 'i-[ph--file-pdf]'],
  ['application/x-cd-image', 'i-[carbon--iso]'],
  ['folder', 'i-[ph--folder-notch-duotone]'],
  ['image/jpeg', 'i-[ph--file-jpg]'],
  ['image/jpg', 'i-[ph--file-jpg]'],
  ['image/png', 'i-[ph--file-png]'],
  ['image/svg+xml', 'i-[ph--file-svg]'],
  ['text/html', 'i-[ph--file-html]'],
  ['text/css', 'i-[ph--file-css-duotone]'],
  ['text/md', 'i-[ph--file-md]'],
  ['text/xml', 'i-[tabler--file-type-xml]'],
  ['file', 'i-[ph--file-duotone]'],
]);
</script>

<i18n lang="json">
{
  "de": {
    "column": {
      "name": "Name",
      "size": "Größe",
      "modified_at": "zuletzt geändert",
      "type": "Typ"
    },
    "contextMenu": {
      "delete": "Löschen"
    }
  },

  "en": {
    "column": {
      "name": "Name",
      "size": "Size",
      "modified_at": "Last modified",
      "type": "Type"
    },
    "contextMenu": {
      "delete": "Delete"
    }
  }
}
</i18n>
