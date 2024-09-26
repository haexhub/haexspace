<template>
  <section
    class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-gray-400 w-full min-w-[360px] relative h-full overflow-hidden min"
  >
    <div
      v-if="$slots.header"
      class="h-16 sticky top-0 z-20 bg-slate-100 dark:bg-slate-950"
    >
      <slot name="header" />
    </div>

    <div class="relative overflow-scroll h-full">
      <slot />
    </div>
  </section>
</template>
