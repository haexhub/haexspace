<template>
  <UiSidebarSubmenu class="items-center">
    <UiButton
      @click="isDark = !isDark"
      class="size-12"
      :icon="
        isDark
          ? 'i-[material-symbols--light-mode-outline] bg-yellow-300 p-4'
          : 'i-[material-symbols--dark-mode-outline] bg-orange-300 p-4'
      "
    >
    </UiButton>

    <UiLanguageSelection />
  </UiSidebarSubmenu>
</template>

<script setup lang="ts">
const { isDark } = storeToRefs(useUi());
</script>
