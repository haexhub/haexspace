import {
  logout,
  type AuthenticationData,
  type DirectusUser,
} from '@directus/sdk';

export const useUserStore = defineStore('userStore', () => {
  const currentUser = ref<DirectusUser | null>(null);
  const errors = ref<unknown[]>([]);

  return {
    currentUser,
    errors,
    getAuthToken,
    getCurrentUserAsync,
    loginAsync,
    logoutAsync,
    setAuthCookies,
    //updateCurrentUserAsync,
  };
});

const loginAsync = async (email: string, password: string) => {
  try {
    console.log('login');
    const { auth, token } = storeToRefs(useDirectusStore());
    token.value = await auth.value.login(email, password);
    console.log('store login', token.value);
    //setAuthCookies(token);
    return token.value;
  } catch (error) {
    throw createError({
      message: JSON.stringify(error),
    });
  }
};

const logoutAsync = async () => {
  const { auth, token } = useDirectusStore();
  if (token?.refresh_token) {
    await auth.request(logout(token?.refresh_token, 'json'));
    await navigateTo(useLocaleRoute()({ name: 'home' }));
  }
};

const getCurrentUserAsync = async (): Promise<DirectusUser | null> => {
  try {
    const { auth } = useDirectusStore();
    const { currentUser } = storeToRefs(useUserStore());

    const user = (await auth.request(readMe())) as DirectusUser;
    currentUser.value = user;
    console.log('found user', currentUser.value);
    return currentUser.value;
  } catch (error) {
    return null;
  }
};

const setAuthCookies = (authData: AuthenticationData) => {
  const config = useRuntimeConfig();
  const access_cookie = useCookie(
    config.public.directus.access_token_cookie_name,
    {
      //maxAge: authData.expires ?? undefined,
      sameSite: 'strict',
    }
  );
  access_cookie.value = authData.access_token;
  console.log('cookie access', access_cookie.value);
  const refresh_cookie = useCookie(
    config.public.directus.refresh_token_cookie_name,
    {
      sameSite: 'strict',
    }
  );
  refresh_cookie.value = authData.refresh_token;
};

const getAuthToken = () => {
  const config = useRuntimeConfig();
  const access_token = useCookie(
    config.public.directus.access_token_cookie_name
  );
  const refresh_token = useCookie(
    config.public.directus.refresh_token_cookie_name
  );

  return {
    access_token: access_token.value,
    refresh_token: refresh_token.value,
  };
};
