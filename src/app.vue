<template>
  <NuxtLayout>
    <NuxtPage keepalive />
  </NuxtLayout>

  <NuxtSnackbar />
  <NuxtLoadingIndicator />
</template>

<script setup lang="ts">
const { isDark } = storeToRefs(useUi());

useHead({
  bodyAttrs: {
    class: { dark: isDark },
  },
});
</script>
