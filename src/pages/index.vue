<template>
  <UiPage>
    <template #header>
      <div class="flex space-x-2">
        <NuxtLinkLocale :to="{ name: 'login' }">Login</NuxtLinkLocale>
        <NuxtLinkLocale
          :to="{
            name: 'folders',
            params: { provider: lastStorageProvider.slug },
          }"
          >Files</NuxtLinkLocale
        >
        <NuxtLinkLocale :to="{ name: 'test2' }">Test 2</NuxtLinkLocale>
        <NuxtLinkLocale :to="{ name: 'foo' }">Test</NuxtLinkLocale>

        <NuxtLinkLocale :to="{ name: 'bar', params: { id: test } }"
          >ole</NuxtLinkLocale
        >
      </div>
    </template>
    <div class="flex">
      <UiCard class="bg-teal-400">
        <NuxtImg src="images/squirrel_nest.jpeg" />
        Create an Account
      </UiCard>
    </div>
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'home',
});

const test = 'test Ornder%$§?\\';
const { lastStorageProvider } = useStorageProvider();
</script>
