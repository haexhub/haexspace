<template>
  <fieldset class="mb-2 grow">
    <label
      v-if="label"
      :for="id"
      class="leading-7 text-sm font-medium text-slate-600 dark:text-slate-300"
    >
      {{ label }}
    </label>

    <div class="flex">
      <div
        v-if="$slots.prepend || prependIcon"
        class="flex items-center text-slate-800 dark:text-slate-200 px-2 bg-slate-200 dark:bg-slate-700 border-y border-l border-slate-500 dark:border-slate-600 rounded-l-lg"
      >
        <slot
          name="prepend"
          v-if="$slots.prepend"
        />
        <UiIcon
          v-else
          :icon="prependIcon"
        />
      </div>

      <input
        :class="[
          { 'rounded-l-lg': !$slots.prepend && !prependIcon },
          { 'rounded-r-lg': !$slots.append && !appendIcon },
        ]"
        :type
        :id
        :name="name ?? id"
        :placeholder
        class="w-full bg-slate-100 bg-opacity-20 focus:bg-opacity-10 focus:ring-2 focus:ring-primary-hover focus:border-primary-active border-slate-600 transition-colors duration-200 ease-in-out text-base outline-none py-2 px-3 leading-8 border z-10 dark:text-slate-200"
        v-model="input"
        :autocomplete="autocomplete ?? name ?? 'off'"
        v-bind="$attrs"
      />

      <div
        v-if="$slots.append || appendIcon"
        class="flex items-center text-slate-800 dark:text-slate-200 px-2 bg-slate-200 dark:bg-slate-700 border-y border-r border-slate-500 dark:border-slate-600 rounded-r-lg"
      >
        <slot
          name="append"
          v-if="$slots.append"
        />
        <UiIcon
          v-else
          :icon="appendIcon"
          class="p-4"
        />
      </div>
    </div>

    <span
      v-show="errors"
      class="text-sm text-red-600 flex flex-col"
    >
      <p v-for="error in errors">{{ error }}</p>
    </span>
  </fieldset>
</template>

<script setup lang="ts">
import { type ZodSchema } from 'zod';

const props = defineProps({
  autocomplete: String,
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  label: String,
  name: String,
  prependIcon: String,
  appendIcon: String,
  rules: Object as PropType<ZodSchema>,
  checkInput: Boolean,
});

const input = defineModel<string | number | undefined | null>({
  required: true,
});

const errors = defineModel<string[] | undefined>('errors');

const id = useId();

watch(input, () => checkInput());
watch(
  () => props.checkInput,
  () => {
    if (props.checkInput) checkInput();
  }
);

const checkInput = () => {
  if (props.rules) {
    const result = props.rules.safeParse(input.value);
    console.log('check result', result);
    if (!result.success) {
      errors.value = result.error.errors.map((error) => error.message);
    } else {
      errors.value = [];
    }
  }
};

defineExpose({ checkInput });
</script>
