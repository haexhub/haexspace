<template>
  <nav
    class="flex items-center justify-between py-4 bg-primary dark:bg-dark-primary rounded-b"
  >
    <div
      class="px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between grow"
    >
      <div class="flex grow lg:grow-0 items-center">
        <UiButton
          @click="toogleSidebar"
          v-tooltip="{
            content: show ? t('sidebar.open') : t('sidebar.close'),
          }"
          class="p-2"
          icon="i-[ph--sidebar-simple] text-slate-50 p-2"
        >
        </UiButton>
        <NuxtLinkLocale
          class="text-sm font-bold leading-relaxed hidden xs:inline-block whitespace-nowrap uppercase text-white mx-4"
          to="/"
        >
          Haex Cloud
        </NuxtLinkLocale>

        <button
          class="text-white text-xl leading-none px-3 py-1 ml-auto border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <i class="i-[fa--bars]"></i>
        </button>
      </div>

      <div
        :class="[showMenu ? 'h-fit' : 'h-0']"
        class="lg:flex lg:justify-end transition-all flex overflow-hidden"
      >
        <ul
          class="flex flex-col lg:flex-row list-none items-start lg:items-center lg:space-x-2 space-y-2 lg:space-y-0 h-full w-full"
        >
          <slot />
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const showMenu = ref(false);

const toggleNavbar = () => {
  showMenu.value = !showMenu.value;
};

const { toogleSidebar, show } = useSidebar();
const { t } = useI18n();
</script>

<i18n lang="json">
{
  "de": {
    "sidebar": {
      "open": "Sidebar öffnen",
      "close": "Sidebar schließen"
    }
  },

  "en": {
    "sidebar": {
      "open": "open sidebar",
      "close": "close sidebar"
    }
  }
}
</i18n>
