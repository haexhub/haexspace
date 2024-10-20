<template>
  <ContextMenuRoot>
    <ContextMenuTrigger
      as-child
      ref="trigger"
    >
      <slot ref="slot" />
    </ContextMenuTrigger>

    <ContextMenuPortal>
      <ContextMenuContent
        class="min-w-[220px] z-30 bg-slate-50 dark:bg-slate-800 border dark:border-slate-600 outline rounded-md py-1 shadow-lg will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        :side-offset="5"
      >
        <UiContextMenuItem
          v-for="item in menu"
          v-bind:item="item"
          :context
        >
        </UiContextMenuItem>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>

<script setup lang="ts">
import { any } from 'zod';
import type { IContextMenuItem } from './types';
import type { ContextMenuTrigger } from 'radix-vue';

defineProps({
  menu: {
    type: Array as PropType<IContextMenuItem[]>,
    default: () => [],
  },
  context: {
    type: Object,
  },
});

const open = defineModel('open', { type: Boolean });

const trigger = ref<typeof ContextMenuTrigger>();
const slot = ref();
/* trigger.value?.current.dispatchEvent(
  new MouseEvent('contextmenu', {
    bubbles: true,
    clientX: slot.value.current.getBoundingClientRect().x,
    clientY: slot.value.current.getBoundingClientRect().y,
  })
); */
</script>
