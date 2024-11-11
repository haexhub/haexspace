//import { useDirectusUser } from '~/server/old_utils/directus/user';

export default defineEventHandler(async (event) => {
  /* try {
    const { getCurrentUserAsync } = useDirectusUser();
    const user = await getCurrentUserAsync(event);
    if (user) {
      user.password = '';
    }
    return user;
  } catch (error) {
    console.log('ERROR get user', error);
  } */
});
