<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
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
