<template>
  <NuxtLinkLocale
    :to
    class="flex items-center justify-center py-3 hover:text-primary cursor-pointer"
    v-tooltip="{
      content: label,
      placement: 'right',
    }"
    activeClass="text-primary bg-slate-200 dark:bg-slate-700"
  >
    <i
      :class="icon"
      class="shrink-0 size-8"
    />
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router';

defineProps({
  label: String,
  tooltip: String,
  icon: String,
  to: Object as PropType<RouteLocationRaw>,
});
</script>
