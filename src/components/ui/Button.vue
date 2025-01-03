<template>
  <button
    :type
    class="flex text-center items-center justify-center align-middle font-sans font-bold transition-all disabled:pointer-events-none rounded"
    :class="{ 'p-1': icon }"
  >
    <i
      v-if="icon"
      :class="icon"
      class="text-inherit min-w-1 min-h-1"
    ></i>
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<'reset' | 'submit' | 'button'>,
    default: 'button',
  },
  icon: {
    type: String || Array,
    default: '',
  },
});
</script>
