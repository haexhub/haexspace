<template>
  <UiContextMenuSub
    v-if="item.children"
    v-bind:item="item"
  >
  </UiContextMenuSub>
  <ContextMenuItem
    v-else
    class="group text leading-none text-slate-700 dark:text-slate-300 rounded flex items-center px-2 py-2 pl-6 select-none outline-none data-[disabled]:text-slate-400 data-[disabled]:pointer-events-none data-[highlighted]:text-slate-800 data-[highlighted]:bg-slate-200 dark:data-[highlighted]:bg-slate-500/40 dark:data-[highlighted]:text-slate-100"
    @click="onClick"
  >
    <UiIcon
      v-if="item.icon"
      :icon="item.icon"
    />

    <span>
      {{ item.label }}
    </span>

    <div
      v-if="item.shortcut"
      class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-primary group-data-[disabled]:text-slate-400"
    >
      {{ item.shortcut }}
    </div>
  </ContextMenuItem>
  <UiContextMenuSeparator v-if="item.serperator" />
</template>

<script setup lang="ts">
import type { IContextMenuItem } from './types';

const props = defineProps({
  item: {
    type: Object as PropType<IContextMenuItem>,
    default: () => {},
  },
  context: Object,
});

const onClick = () => {
  console.log('om lcikc', props.context);
  if (props.item.handler) props.item.handler(props.context);
};
</script>
