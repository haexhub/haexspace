<template>
  <tr
    @click.exact="onSelect"
    @click.ctrl.exact="onSelectMultiple"
    :class="[
      isSelected
        ? 'bg-slate-200 dark:bg-slate-500/40 ring-1 ring-primary'
        : 'hover:bg-slate-200 dark:hover:bg-slate-500/40',
    ]"
    draggable="true"
    @dragstart="onDrag"
    class="text-sm font-normal transition-all duration-200"
  >
    <slot />
  </tr>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object as PropType<Record<string, any>>,
    default: () => {},
  },
});

const selectedItems = defineModel({
  type: Array as PropType<Record<string, any>[]>,
  default: () => [],
});

const isSelected = computed(() => selectedItems.value?.includes(props.item));

const onSelect = () => {
  if (isSelected.value) {
    selectedItems.value = [];
  } else {
    selectedItems.value = [props.item];
  }
};

const onSelectMultiple = () => {
  if (isSelected.value) {
    selectedItems.value = selectedItems.value.filter(
      (selectedItem) => selectedItem !== props.item
    );
  } else {
    selectedItems.value = [...selectedItems.value, props.item];
  }
};

const onDrag = (e: Event) => {
  console.log('drag', e);
};
</script>
