<template>
  <div
    class="flex justify-between shrink-0 transition-[width] ease-in duration-300 sm:w-96 max-w-full z-30 h-full overflow-hidden absolute sm:relative shadow"
    :class="[show ? 'w-full xs:w-96 ' : 'w-0']"
    ref="sidebar"
  >
    <div class="flex flex-col w-16 bg-slate-800 shrink-0">
      <img
        src="/logo.svg"
        class="bg-primary p-3 size-16"
        placeholder
      />

      <div class="flex flex-col justify-between h-full">
        <div class="flex flex-col space-y-2 text-slate-100/50">
          <UiSidebarLink
            v-for="item in menu.top"
            :to="item.to"
            :icon="item.icon"
            :label="item.label"
            @click="item.click"
          />
        </div>

        <div class="flex flex-col space-y-2 text-slate-100/50">
          <UiSidebarLink
            v-for="item in menu.bottom"
            :icon="item.icon"
            :to="item.to"
            :label="item.label"
            @click="item.click"
          />
        </div>
      </div>
    </div>

    <div class="bg-slate-200 dark:bg-slate-700 flex flex-col w-full">
      <div
        class="h-16 flex items-center bg-slate-300 dark:bg-slate-600 shrink-0"
      >
        <span
          class="px-4 font-semibold text-slate-800 dark:text-slate-200 shrink-0"
        >
          Haex Space
        </span>
        <UiButton
          class="size-10 sm:hidden ml-auto border-0 bg-primary hover:bg-primary-hover m-2"
          icon="i-[ph--x] p-4"
          @click="show = false"
        />
      </div>

      <div class="relative w-full h-full">
        <!-- <UiSidebarSubmenuFolders v-if="useRoute().path?.includes('files')" /> -->
        <UiSidebarSubmenuSettings
          v-if="useRoute().path?.includes('settings')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ISidebarMenu } from '~/stores/sidebar';

defineProps({
  menu: {
    type: Object as PropType<ISidebarMenu>,
    default: () => {},
  },
});

const { show } = storeToRefs(useSidebar());

const sidebar = ref<HTMLElement | null>(null);
onClickOutside(sidebar, () => (show.value = false));
</script>
