<template>
  <div
    class="h-dvh w-screen flex flex-col"
    :class="minWidth"
  >
    <div class="flex h-full relative">
      <UiButton
        v-show="!show"
        class="top-2 left-2 absolute size-12 z-50 delay-500 sm:hidden sm:delay-0 bg-primary hover:bg-primary-hover transition-opacity"
        icon="i-[ph--list] p-4"
        @click="show = !show"
      />

      <UiSidebar :menu />

      <div
        class="overflow-auto w-full sm:blur-none transition-all relative pb-10"
        :class="{ 'blur-sm': show }"
      >
        <slot />
        <UiBottomMenu></UiBottomMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { minWidth } = storeToRefs(useUi());
const { show, menu } = storeToRefs(useSidebar());
</script>

<i18n lang="json">
{
  "de": {
    "login": "Einloggen",
    "logout": "Abmelden",
    "logoutSuccess": "Erfolgreich abgemeldet"
  },

  "en": {
    "login": "Login",
    "logout": "Logout",
    "logoutSuccess": "Logout successfull"
  }
}
</i18n>
