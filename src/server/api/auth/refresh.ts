import { authentication, readFiles, refresh, rest } from '@directus/sdk';

export default defineEventHandler(async (event) => {
  const { directus, auth, setCookies } = useDirectusClient();
  try {
    const { refresh_token } = await readBody(event);
    const newTokens = await directus
      .with(authentication('json'))
      .with(rest())
      .request(refresh('json', refresh_token));
    console.log('new token', newTokens);

    await auth.setToken(newTokens.access_token);
    const files = await auth.with(rest()).request(readFiles());
    console.log('files', files);
  } catch (error) {
    console.log('ERROR Refresh', error);
    setCookies(event, null, null);
  } finally {
  }
});
