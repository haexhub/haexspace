import { login, rest } from '@directus/sdk';

export default defineEventHandler(async (event) => {
  const { provider, email, password } = await readBody(event);
  const { directus } = useDirectusClient();
  await directus.with(rest()).request(login(email, password, { provider }));
});
