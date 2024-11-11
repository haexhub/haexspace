<template>
  <tr
    :class="[
      isSelected
        ? 'bg-slate-200 dark:bg-slate-700 ring-1 ring-primary'
        : 'hover:bg-slate-200 dark:hover:bg-slate-700 bg-slate-50 dark:bg-slate-600',
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
  isSelected: Boolean,
});

const selectedItems = defineModel({
  type: Array as PropType<Record<string, any>[]>,
  default: () => [],
});

const onDrag = (e: Event) => {
  console.log('drag', e);
};

const onDelete = () => {
  console.log('remove', props.item);
};
</script>
