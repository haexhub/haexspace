import { DirectusUser } from '@directus/sdk';
//import { useDirectusUser } from '~/server/old_utils/directus/user';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface IRequestBody {
  user: PartialBy<DirectusUser, 'tfa_secret'>;
}
export default defineEventHandler(async (event) => {
  /* try {
    const { user } = await readBody<IRequestBody>(event);

    const { updateCurrentUserAsync } = useDirectusUser();
    if (!user) return;
    delete user.tfa_secret;
    await updateCurrentUserAsync(event, user);
    return user;
  } catch (error) {
    console.log('ERROR update user', error);
  } */
});
