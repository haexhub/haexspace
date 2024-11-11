<template>
  <div></div>
</template>

<script setup lang="ts">
import type { IDirectusFile } from './file';
defineProps({
  file: {
    type: Object as PropType<IDirectusFile>,
    default: () => {},
  },
});
</script>
