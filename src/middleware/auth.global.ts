import { refresh } from '@directus/sdk';
import { useDirectusStore } from '~/stores/directus';
import { useUserStore } from '~/stores/directus/user';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (!to.fullPath.includes('private')) return;

  const { auth, token } = storeToRefs(useDirectusStore());
  const localeRoute = useLocaleRoute();

  console.log('middleware refresh_token', token.value);
  if (token.value?.refresh_token) {
    try {
      token.value = await auth.value.request(
        refresh('json', token.value.refresh_token)
      );
      console.log('middleware new token', token.value);
      await auth.value.setToken(token.value.access_token);
    } catch (error) {
      console.log('EROR middleware', error);
      token.value = null;
      return navigateTo(localeRoute({ name: 'login' }));
    }
  } else {
    token.value = null;
    return navigateTo(localeRoute({ name: 'login' }));
  }
});
