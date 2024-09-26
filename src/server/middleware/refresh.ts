import { refresh } from '@directus/sdk';

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api')) return;
  return;
  /* const { setCookies, auth } = useDirectusClient();
  const config = useRuntimeConfig();

  const refresh_token =
    event.context.refresh_token ??
    getCookie(event, config.public.directus.refresh_token_cookie_name);

  console.log(
    'refresh middleware token',
    event.path,
    refresh_token,
    event.context.refresh_token
  );
  try {
    if (refresh_token && !event.context.refresh_token) {
      const newTokens = await auth.request(refresh('json', refresh_token));
      setCookies(event, newTokens.access_token, newTokens.refresh_token);
      event.context.access_token = newTokens.access_token;
      event.context.refresh_token = newTokens.refresh_token;
    }
  } catch (error) {
    console.log('error refresh', JSON.stringify(error));
    setCookies(event, null, null);
  } */
});
