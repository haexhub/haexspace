import type {
  CoreSchema,
  DirectusUser,
  Query,
  RestClient,
} from '@directus/sdk';
import { logout, readMe, updateMe } from '@directus/sdk';
import { H3Event } from 'h3';

export const useDirectusUser = () => {
  return {
    authAsync,
    loginAsync,
    logoutAsync,
    getCurrentUserAsync,
    updateCurrentUserAsync,
  };
};

const authAsync = async (event: H3Event): Promise<RestClient<any> | null> => {
  const config = useRuntimeConfig();
  const { auth } = useDirectusClient();
  const access_token =
    event.context.access_token ??
    getCookie(event, config.public.directus.access_token_cookie_name);
  if (access_token) {
    //console.log('login with access token', access_token);
    await auth.setToken(access_token);
    return auth;
  }
  return null;
};

const loginAsync = async (email: string, password: string) => {
  const { auth } = useDirectusClient();
  await auth.login(email, password);
  return auth;
};

const logoutAsync = async (event: H3Event) => {
  const client = await authAsync(event);
  const config = useRuntimeConfig();
  const refresh_token =
    event.context.refresh_token ??
    getCookie(event, config.public.directus.refresh_token_cookie_name);
  if (client) {
    return await client.request(logout(refresh_token));
  }
  return null;
};

const getCurrentUserAsync = async (
  event: H3Event
): Promise<DirectusUser | null> => {
  const client = await authAsync(event);
  if (client) {
    return (await client.request(readMe())) as DirectusUser;
  }
  return null;
};

const updateCurrentUserAsync = async (
  event: H3Event,
  user: Partial<DirectusUser>
) => {
  const client = await authAsync(event);
  if (client) {
    return await client.request(updateMe(user));
  }
  return null;
};
