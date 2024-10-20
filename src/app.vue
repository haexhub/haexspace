<template>
  <NuxtLayout>
    <NuxtPage keepalive />
  </NuxtLayout>

  <NuxtSnackbar />
  <NuxtLoadingIndicator />
</template>

<script setup lang="ts">
const { isDark } = storeToRefs(useUi());
import { invoke } from '@tauri-apps/api/core';

useHead({
  bodyAttrs: {
    class: { dark: isDark },
  },
});
</script>
