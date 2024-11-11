import { refresh } from '@directus/sdk';
import { useDirectusStore } from '~/stores/directus';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (!to.fullPath.includes('private')) return;

  const { auth, token, errors } = storeToRefs(useDirectusStore());
  const localeRoute = useLocaleRoute();

  if (token.value?.refresh_token) {
    try {
      token.value = await auth.value.request(
        refresh('json', token.value?.refresh_token ?? '')
      );

      await auth.value.setToken(token.value.access_token);
    } catch (error) {
      console.log('ERROR auth middleware', error);

      token.value = null;
      return navigateTo(localeRoute({ name: 'login' }));
    }
  } else {
    token.value = null;
    return navigateTo(localeRoute({ name: 'login' }));
  }
});
