<template>
  <NuxtLayout>
    <UiPage>
      foobar

      <NuxtLinkLocale to="/">Home</NuxtLinkLocale>
    </UiPage>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'foo',
});
</script>
