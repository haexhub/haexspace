//import { useDirectusClient } from '~/server/old_utils/directus';
import { authentication } from '@directus/sdk';

export default defineEventHandler(async (event) => {
  /* const body = await readBody(event);

  const { setCookies, directus } = useDirectusClient();

  try {
    const authData = await directus
      .with(authentication('json'))
      .login(body.email, body.password);
    console.log('logged in', authData);
    setCookies(event, authData.access_token, authData.refresh_token);

    return true;
  } catch (error) {
    console.log('error login ', error);
    return false;
  } */
});
