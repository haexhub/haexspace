<template>
  <UiPage>
    <div class="h-svh overflow-hidden">
      <div class="flex h-full items-center justify-center">
        <NuxtImg
          class="object-cover object-center hidden md:block w-1/2 rounded-l h-full"
          src="/squirel_challenge.jpg"
          placeholder
        />

        <form
          class="p-4 flex flex-col md:mx-4 xl:mx-auto w-full md:w-1/2 xl:w-1/3 bg-slate-100 dark:bg-slate-800 rounded-lg space-y-6 shadow-md dark:shadow-slate-900"
        >
          <h2 class="text-lg font-medium title-font">
            {{ t('login') }}
          </h2>

          <UiInput
            v-model="username"
            :label="t('username')"
            :placeholder="t('username')"
            name="username"
            prepend-icon="i-[mdi--person-outline] p-3"
            type="text"
          >
          </UiInput>

          <UiInput
            :label="t('password')"
            :placeholder="t('password')"
            :type="password.show ? 'text' : 'password'"
            name="password"
            v-model="password.value"
            prepend-icon="i-[mdi--password-outline] p-3"
          >
            <template #append>
              <UiButton
                class="flex p-0"
                @click.prevent="password.show = !password.show"
                :icon="
                  password.show
                    ? 'i-[mdi--eye-off-outline]'
                    : 'i-[mdi--eye-outline]'
                "
              >
              </UiButton>
            </template>
          </UiInput>

          <UiButton
            class="bg-primary dark:bg-dark-primary py-4 px-8 focus:outline-none hover:bg-primary-hover dark:hover:bg-dark-primary-hover rounded text-xl"
            type="submit"
            @click.prevent="onLogin"
          >
            {{ t('login') }}
          </UiButton>
        </form>
      </div>
    </div>
  </UiPage>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/directus/user';
definePageMeta({
  name: 'login',
});

const { show } = storeToRefs(useSidebar());
show.value = false;

const password = reactive({
  show: false,
  value: '',
});

const username = ref('');

const { t } = useI18n({});

const { loginAsync } = useUserStore();

const snackbar = useSnackbar();
const localeRoute = useLocaleRoute();

const { execute, error, data } = await useAsyncData(
  () => loginAsync(username.value, password.value),
  { immediate: false }
);

const onLogin = async () => {
  try {
    await execute();

    if (error.value)
      snackbar.add({ type: 'error', text: JSON.stringify(error) });

    show.value = true;
    await navigateTo(localeRoute({ name: 'profile' }));
  } catch (e) {
    snackbar.add({ type: 'error', text: JSON.stringify(error) });
    console.log('ERROR onLogin', error);
  }
};

onMounted(() => {
  show.value = false;
});
</script>

<i18n lang="json">
{
  "de": {
    "login": "Anmelden",
    "username": "Nutzername",
    "password": "Passwort",
    "loginError": "Kombination von Nutzername und Passwort stimmen nicht überein"
  },
  "en": {
    "login": "Login",
    "username": "Username",
    "password": "Password",
    "loginError": "Kombination of username and password doesn't match"
  }
}
</i18n>
