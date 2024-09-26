<template>
  <ContextMenuRoot>
    <ContextMenuTrigger as-child>
      <slot />
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

defineProps({
  menu: {
    type: Array as PropType<IContextMenuItem[]>,
    default: () => [],
  },
  context: {
    type: any,
  },
});
</script>
