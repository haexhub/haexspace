<template>
  <button
    :type
    class="flex text-center items-center justify-center align-middle font-sans font-bold transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded hover:shadow"
    :class="[icon ? 'p-1' : '']"
  >
    <i
      v-if="icon"
      :class="icon"
      class=""
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
