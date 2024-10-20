<template>
  <div
    class="min-h-52 w-full place-items-center overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700 dark:text-slate-200"
  >
    <div class="flex items-center justify-center md:justify-start flex-wrap">
      <UiButton v-if="data?.src">
        <img
          class="object-cover object-center size-52 rounded-full p-4"
          :src="data.src"
          :alt="data.alt"
        />
      </UiButton>

      <UiButton
        v-else
        icon="i-[ph--user-circle-thin] size-52"
      />
      <span class="flex flex-col py-4 px-6">
        <h3 class="font-bold">{{ user?.first_name }} {{ user?.last_name }}</h3>
        <p>{{ user?.email }}</p>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DirectusUser } from '~/composables/storageProvider/directus/types';

const { getThumbnailAsync } = useDirectusFiles();

const props = defineProps({
  src: String,
  alt: String,
  user: {
    type: Object as PropType<DirectusUser | null>,
    default: null,
  },
});

const { data, execute } = await useAsyncData(
  async () => getThumbnailAsync(props.user?.avatar),
  { immediate: false }
);

onMounted(() => execute());
</script>
