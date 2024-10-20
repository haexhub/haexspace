<template>
  <div ref="activator">
    <div
      :id
      class="p-2 focus:ring-2 focus:outline-none focus:ring-primary-focus dark:focus:ring-dark-primary-focus font-medium rounded-lg text-sm text-center inline-flex items-center"
    >
      <slot
        name="value"
        :value
      />
      <button
        @click.prevent="toogleMenu"
        class="flex items-center p-1 hover:shadow rounded-md hover:bg-primary hover:text-slate-200"
      >
        <i class="i-[material-symbols--keyboard-arrow-down] size-4" />
      </button>
    </div>

    <!-- Dropdown menu -->
    <div
      class="z-10 bg-white divide-y divide-slate-100 rounded-lg shadow dark:bg-slate-700 absolute top-14"
      :class="{ hidden: !show }"
    >
      <ul
        class="py-2 text-sm text-slate-700 dark:text-slate-200"
        :aria-labelledby="id"
      >
        <li
          v-for="option in options"
          :key="option"
          class="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white"
          @click="
            value = option;
            show = false;
          "
        >
          <slot
            name="option"
            :option
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

const id = useId();

defineProps({
  label: String,
  options: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
});
const value = defineModel<Record<string, any>>();

const show = ref(false);
const toogleMenu = () => {
  show.value = !show.value;
};

const activator = ref(null);

onClickOutside(activator, () => (show.value = false));
</script>
