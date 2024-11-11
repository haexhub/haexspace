<template>
  <UiPage>
    <div class="h-screen justify-center flex">
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
    </div>
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'settings',
});

const { isDark } = storeToRefs(useUi());
</script>
