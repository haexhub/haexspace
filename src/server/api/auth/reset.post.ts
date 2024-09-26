import { passwordRequest, rest } from '@directus/sdk';

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  const { directus } = useDirectusClient();
  directus.with(rest()).request(passwordRequest(email));
});
