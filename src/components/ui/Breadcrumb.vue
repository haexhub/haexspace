<template>
  <NuxtLinkLocale
    :to
    class="hover:text-primary text-nowrap"
  >
    {{ name }}
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import type {
  RouteLocationAsRelativeGeneric,
  RouteLocationAsPathGeneric,
} from 'vue-router';

defineProps({
  to: {
    type: Object as PropType<
      string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
    >,
    default: () => {},
  },
  name: String,
});
</script>
