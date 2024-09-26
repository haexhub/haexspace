import { logout } from '@directus/sdk';

export default defineEventHandler(async (event) => {
  const { setCookies } = useDirectusClient();
  const { logoutAsync } = useDirectusUser();
  try {
    await logoutAsync(event);
  } catch (error) {
    console.log('ERROR LOGOUT', error);
  } finally {
    setCookies(event, null, null);
  }
});
