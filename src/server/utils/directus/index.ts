import { authentication, createDirectus, rest } from '@directus/sdk';
import { H3Event } from 'h3';

export const useDirectusClient = () => {
  const config = useRuntimeConfig();
  const directus = createDirectus(config.public.directus.url);
  const auth = directus.with(authentication('json')).with(rest());

  return {
    auth,
    directus,
    setCookies,
  };
};

const setCookies = (
  event: H3Event,
  access_token: string | null = '',
  refresh_token: string | null = ''
) => {
  const config = useRuntimeConfig();

  if (access_token) {
    console.log('set access cookie', access_token);
    setCookie(
      event,
      config.public.directus.access_token_cookie_name,
      access_token ?? '',
      {
        httpOnly: true,
        sameSite: 'strict',
      }
    );
  } else {
    deleteCookie(event, config.public.directus.access_token_cookie_name);
  }

  if (refresh_token) {
    console.log('set refresh cookie', refresh_token);
    setCookie(
      event,
      config.public.directus.refresh_token_cookie_name,
      refresh_token ?? '',
      {
        httpOnly: true,
        sameSite: 'strict',
      }
    );
  } else {
    deleteCookie(event, config.public.directus.refresh_token_cookie_name);
  }
};
