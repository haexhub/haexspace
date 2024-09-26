<template>
  <button
    :type
    class="flex text-center items-center justify-center align-middle select-none font-sans font-bold uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg hover:shadow-lg active:opacity-[0.85] active:shadow-none hover:!opacity-100 text-slate-800 dark:text-slate-200 border"
    :class="[icon ? 'p-1' : '']"
  >
    <i
      v-if="icon"
      :class="icon"
      class="p-2"
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
