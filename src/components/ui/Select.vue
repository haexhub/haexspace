<template>
  <div ref="activator">
    <div
      :id
      class="p-2 focus:ring-2 focus:outline-none focus:ring-primary-focus dark:focus:ring-dark-primary-focus font-medium rounded-lg text-sm text-center inline-flex items-center"
    >
      <slot
        name="value"
        :value
      >
        <span>{{ value }}</span>
      </slot>
      <button
        @click.prevent="toogleMenu"
        class="flex items-center p-1 hover:shadow rounded-md hover:bg-primary hover:text-slate-200"
      >
        <i class="i-[material-symbols--keyboard-arrow-down] size-4" />
      </button>
    </div>

    <!-- Dropdown menu -->
    <div
      class="bg-white divide-y divide-slate-100 rounded-lg shadow dark:bg-slate-700 absolute top-12"
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
          >
            {{ option }}
          </slot>
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
    type: Array as PropType<unknown[]>,
    default: () => [],
  },
});
const value = defineModel<unknown>();

const show = ref(false);
const toogleMenu = () => {
  show.value = !show.value;
};

const activator = ref(null);

onClickOutside(activator, () => (show.value = false));
</script>
