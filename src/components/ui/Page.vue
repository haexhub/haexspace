<template>
  <section
    class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-gray-400 w-full min-w-[360px] h-full overflow-hidden"
    :class="{ 'pb-16': $slots.header }"
  >
    <div
      v-if="$slots.header"
      class="pl-12 sm:pl-0 h-16 sticky top-0 z-20 bg-slate-100 dark:bg-slate-900 shadow"
    >
      <slot name="header" />
    </div>

    <div class="overflow-auto w-full relative h-full">
      <slot />
    </div>
  </section>
</template>
