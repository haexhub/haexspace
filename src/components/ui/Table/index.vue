<template>
  <div class="rounded-lg shadow-md relative h-full">
    <table
      class="min-w-full text-left border-separate border-spacing-y-0.5 h-full"
      ref="table"
    >
      <thead class="">
        <UiTableColumns>
          <UiTableColumn v-for="column in columns">
            {{ column.label }}
          </UiTableColumn>
        </UiTableColumns>
      </thead>

      <tbody class="">
        <slot name="body">
          <UiTableRow
            v-for="item in items"
            ref="row"
            :item
            v-model="selectedItems"
            @dblclick="onDbClick(item)"
          >
            <UiTableItem v-for="column in columns">
              {{
                column.formatter
                  ? column.formatter(item?.[column.prop])
                  : item?.[column.prop]
              }}
            </UiTableItem>
          </UiTableRow>
        </slot>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { IColumn } from './table';

defineProps({
  columns: {
    type: Array as PropType<IColumn[]>,
    default: () => [],
  },
  items: {
    type: Array as PropType<Record<string, any>[] | null>,
    default: () => [],
  },
});

const table = ref<HTMLElement | null>(null);
const row = ref<HTMLElement | null>(null);

const { selectedItems } = useTable();

onClickOutside(table, (event) => (selectedItems.value = []));

const onDbClick = (item: Record<string, unknown>) => {
  const localeRoute = useLocaleRoute();
  console.log('dbclick', item);
};
</script>
