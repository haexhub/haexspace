<template>
  <UiPage>
    <template #header>
      <div class="flex space-x-2">
        <NuxtLinkLocale :to="{ name: 'login' }">Login</NuxtLinkLocale>
        <NuxtLinkLocale :to="{ name: 'files' }">Files</NuxtLinkLocale>
        <NuxtLinkLocale :to="{ name: 'test2' }">Test 2</NuxtLinkLocale>
        <NuxtLinkLocale :to="{ name: 'foo' }">Test</NuxtLinkLocale>
      </div>
    </template>
    <UiCard>
      <UiInput v-model="token" />
      <UiButton @click="onClick">Refresh</UiButton>
      <UiButton @click="onTest">Set Cookie</UiButton>
      <NuxtImg
        src="/logo.svg"
        class="bg-primary p-3 size-16"
        placeholder
      />
    </UiCard>
    <div class="p-16">
      <div class="test resize bg-purple-400 border-8 size-32 overflow-hidden">
        aaa {{ token }} aaa
      </div>
      {{ test }}
    </div>
  </UiPage>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'home',
});

const token = ref();

const test = useCookie('test', { sameSite: 'strict' });
const names = useRuntimeConfig().public.directus;

const { getAuthToken, setAuthCookies } = useUserStore();

const onClick = () => {
  token.value = useCookie(names.access_token_cookie_name).value; //getAuthToken().access_token;
};

const onTest = () => {
  const test = useCookie(names.access_token_cookie_name, {
    sameSite: 'strict',
    secure: false,
  });
  test.value = 'fooooooo';
  //refreshCookie(names.access_token_cookie_name);
  /* setAuthCookies({
    access_token: 'foo',
    refresh_token: 'bar',
    expires: 900000,
  }); */
};
</script>

<style>
.test {
  resize: both;
}
</style>
