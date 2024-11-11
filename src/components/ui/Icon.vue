<template>
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger as-child>
        <i
          :class="icon"
          v-bind="$attrs"
        ></i>
      </TooltipTrigger>

      <TooltipPortal v-if="tooltip?.text">
        <TooltipContent
          class="z-50"
          v-bind="tooltip.content"
        >
          <span class="bg-slate-100 px-2 py-1 rounded">
            {{ tooltip.text }}
          </span>
          <TooltipArrow class="fill-slate-800" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<script setup lang="ts">
interface ITooltipProps {
  content?: {
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
  };
  text: string;
}
defineProps({
  icon: String,
  tooltip: Object as PropType<ITooltipProps>,
});
</script>
