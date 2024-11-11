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
    <UiCard>
      <img
        src="/logo.svg"
        class="bg-primary p-3 size-16"
        placeholder
      />
      <span class="flex items-center gap-2">
        <p>Hallo mein</p>
        <i class="i-[game-icons--caterpillar] text-green-500 size-10"></i>
      </span>
    </UiCard>
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'home',
});

const test = 'test Ornder%$§?\\';
const { lastStorageProvider } = useStorageProvider();
</script>
