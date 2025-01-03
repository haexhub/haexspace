<template>
  <UiPage>
    <div class="">
      <div class="flex items-center justify-center overflow-hidden h-dvh">
        <img
          class="object-cover object-center hidden lg:block w-1/2 rounded-l my-auto h-screen"
          src="/squirel_challenge.jpg"
          placeholder
          quality="80"
          alt="squirel"
        />

        <form
          class="lg:mx-2 p-4 flex flex-col w-full lg:w-1/2 bg-slate-100 dark:bg-slate-800 rounded-lg gap-3 shadow-md dark:shadow-slate-900"
        >
          <h2 class="text-lg font-medium title-font">
            {{ t('login') }}
          </h2>

          <div v-if="accounts.length">
            <h3 class="text-sm">{{ t('lastAccounts') }}</h3>
            <ul class="flex flex-col gap-1">
              <li
                v-for="account in accounts"
                class="bg-slate-200 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-secondary px-2 py-1 rounded flex items-center"
              >
                <UiButton
                  class="text-sm w-full"
                  @click="onSelectAccount(account)"
                >
                  {{ account }}
                </UiButton>

                <UiButton
                  icon="i-[material-symbols--delete-outline]"
                  class="text-red-600 hover:scale-150"
                  @click="onRemoveAccount(account)"
                />
              </li>
            </ul>
          </div>

          <UiInput
            v-model="username"
            :label="t('username')"
            :placeholder="t('username')"
            name="username"
            prepend-icon="i-[mdi--person-outline] p-3"
            type="text"
            autocomplete="username"
          >
          </UiInput>

          <UiInput
            :label="t('password')"
            :placeholder="t('password')"
            :type="password.show ? 'text' : 'password'"
            autocomplete="current-password"
            name="password"
            prepend-icon="i-[mdi--password-outline] p-3"
            ref="passwordRef"
            v-model="password.value"
          >
            <template #append>
              <UiButton
                class="flex size-6"
                aria-label="toogle visibility of password "
                @click.prevent="password.show = !password.show"
                :icon="
                  password.show
                    ? 'i-[mdi--eye-off-outline]'
                    : 'i-[mdi--eye-outline] '
                "
              >
              </UiButton>
            </template>
          </UiInput>

          <UiButton
            class="bg-primary dark:bg-dark-primary py-4 px-8 focus:outline-none hover:bg-primary-hover dark:hover:bg-dark-primary-hover rounded text-xl text-slate-50"
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
definePageMeta({
  name: 'login',
});

const { getAccountsAsync, addAccountAsync, removeAccountAsync } =
  useTauriStore();
const accounts = ref<string[]>([]);

accounts.value = await getAccountsAsync();

const passwordRef = ref();
const password = reactive({
  show: false,
  value: '',
});

const username = ref('');

const { t } = useI18n({});

const { loginAsync } = useUserStore();

const snackbar = useSnackbar();
const localeRoute = useLocaleRoute();

const { execute, error, data, status } = await useAsyncData(
  'login',
  () => loginAsync(username.value, password.value),
  { immediate: false }
);

const onLogin = async () => {
  try {
    //const { auth, token } = storeToRefs(useDirectusStore());
    //token.value = await auth.value.login(username.value, password.value);

    await execute();

    if (error.value) {
      snackbar.add({
        type: 'error',
        text: JSON.stringify(error.value),
      });
      console.log('ERROR onLogin ee', error.value, status.value);
    } else {
      console.log('all right', data.value);

      await addAccountAsync(username.value);

      await navigateTo(
        localeRoute({
          name: 'profile',
          //params: { provider: haexSpaceSlug }
        })
      );
    }
  } catch (e) {
    snackbar.add({ type: 'error', text: JSON.stringify(error.value) });
    console.log('ERROR onLogin', e);
  }
};

const onSelectAccount = (account: string) => {
  username.value = account;
  passwordRef.value.inputRef.focus();
};

const onRemoveAccount = async (account: string) => {
  await removeAccountAsync(account);
  accounts.value = await getAccountsAsync();
};
</script>

<i18n lang="json">
{
  "de": {
    "login": "Anmelden",
    "username": "Nutzername",
    "password": "Passwort",
    "loginError": "Kombination von Nutzername und Passwort stimmen nicht überein",
    "lastAccounts": "Zuletzt verwendete Accounts"
  },
  "en": {
    "login": "Login",
    "username": "Username",
    "password": "Password",
    "loginError": "Kombination of username and password doesn't match",
    "lastAccounts": "Last used accounts"
  }
}
</i18n>
