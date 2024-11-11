<template>
  <div
    class="flex flex-col text-gray-700 bg-white dark:bg-slate-700 dark:text-slate-100 shadow-md bg-clip-border rounded-md"
  >
    <div>
      <slot name="header" />
    </div>
    <div
      v-if="$slots.image"
      class="h-56 m-2 overflow-hidden shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40"
    >
      <slot name="image" />
    </div>
    <div class="p-6">
      <h5
        v-if="$slots.title || title"
        class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
      >
        <slot
          name="title"
          v-if="$slots.title"
        />
        <span v-else>{{ title }}</span>
      </h5>
      <p
        class="block font-sans text-base antialiased font-light leading-relaxed text-inherit"
      >
        <slot name="text" />
      </p>

      <slot />
    </div>
    <div
      class="p-6 pt-0"
      v-if="$slots.footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});
</script>
