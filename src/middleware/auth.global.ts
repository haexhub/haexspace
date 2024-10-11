import { refresh } from '@directus/sdk';
import { useDirectusStore } from '~/stores/directus';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (!to.fullPath.includes('private')) return;

  const { auth, token, errors } = storeToRefs(useDirectusStore());
  const localeRoute = useLocaleRoute();
  console.log('middelware token', token.value);
  //console.log('middleware current refresh_token', token.value);
  if (token.value?.refresh_token) {
    try {
      const old_token = token.value;
      token.value = await auth.value.request(
        refresh('json', token.value?.refresh_token ?? '')
      );
      //console.log(' middleware new token', token.value);
      await auth.value.setToken(token.value.access_token);
      errors.value = { token: token.value, old_token };
    } catch (error) {
      console.log('EROR middleware', error);
      errors.value = { error, token: token.value };
      token.value = null;
      return navigateTo(localeRoute({ name: 'login' }));
    }
  } else {
    token.value = null;
    errors.value = { token: token.value };

    return navigateTo(localeRoute({ name: 'login' }));
  }
});
