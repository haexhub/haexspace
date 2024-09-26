<template>
  <ContextMenuSub>
    <ContextMenuSubTrigger
      class="group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:bg-green9 data-[highlighted]:data-[state=open]:text-green1"
    >
      {{ item.label }}
      <div
        class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-primary group-data-[disabled]:text-mauve8"
      >
        <UiIcon icon="i-[mdi--chevron-right]" />
      </div>
    </ContextMenuSubTrigger>
    <ContextMenuPortal>
      <ContextMenuSubContent
        class="min-w-[220px] z-30 outline-none bg-white rounded-md p-[5px] shadow-lg will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        :side-offset="2"
        :align-offset="-5"
      >
        <UiContextMenuItem
          v-for="child in item.children"
          v-bind:item="child"
        >
        </UiContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuPortal>
  </ContextMenuSub>
</template>

<script setup lang="ts">
import type { IContextMenuItem } from './types';
defineProps({
  item: {
    type: Object as PropType<IContextMenuItem>,
    default: () => {},
  },
});
</script>
