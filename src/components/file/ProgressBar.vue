<template>
  <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 h-3.5">
    <div
      class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
      :style="width"
    >
      {{ progress }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  progress: {
    type: Number as PropType<MaybeRef<number>>,
    default: 0,
  },
});

const width = computed(() => props.progress + '%');
</script>
