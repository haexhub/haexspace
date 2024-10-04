<template>
  <div
    class="rounded-lg shadow-md pb-16 h-full"
    @keyup.delete="onDelete"
  >
    <table
      class="min-w-full text-left border-collapse"
      ref="table"
    >
      <thead class="sticky top-0">
        <UiTableColumns>
          <UiTableColumn v-for="column in columns">
            {{ column.label }}
          </UiTableColumn>
        </UiTableColumns>
      </thead>

      <tbody class="">
        <UiTableRow
          v-for="item in items"
          ref="row"
          :item
          :is-selected="isSelected(item)"
          v-model="selectedItems"
          @dblclick="onDbClick(item)"
          @click.exact="onSelect(item)"
          @click.ctrl.exact="onSelectMultiple(item)"
        >
          <UiTableItem v-for="column in columns">
            {{
              column.formatter
                ? column.formatter(item?.[column.prop])
                : item?.[column.prop]
            }}
          </UiTableItem>
        </UiTableRow>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { ITableFile, ITableFileColumn } from './table';

defineProps({
  items: {
    type: Array as PropType<ITableFile[] | null>,
    default: () => [],
  },
});

const table = ref<HTMLElement | null>(null);
const row = ref<HTMLElement | null>(null);

const { selectedItems } = useTable();

onClickOutside(table, (event) => (selectedItems.value = []));

const onDbClick = async (item: ITableFile) => {
  const localeRoute = useLocaleRoute();
  console.log('dbclick', item);
  if (item.isDirectory)
    await navigateTo(localeRoute({ name: 'folders', params: { id: item.id } }));
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
        return '';
      },
    },
  ];
});

const contextMenu = [
  {
    label: t('contextMenu.test'),
    handler: () => {},
  },
];
</script>

<i18n lang="json">
{
  "de": {
    "column": {
      "name": "Name",
      "size": "Größe",
      "modified_at": "zuletzt geändert"
    },
    "contextMenu": {
      "test": "huhu"
    }
  },

  "en": {
    "column": {
      "name": "Name",
      "size": "Size",
      "modified_at": "Last modified"
    }
  }
}
</i18n>
