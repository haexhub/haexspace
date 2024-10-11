import {
  authentication,
  createDirectus,
  realtime,
  rest,
  type AuthenticationData,
} from '@directus/sdk';

export const useDirectusStore = defineStore(
  'directusStore',
  () => {
    const config = useRuntimeConfig();
    const directus = ref(
      createDirectus(config.public.directus.url).with(rest())
    );
    const auth = computed(() =>
      directus.value.with(authentication('json')).with(rest())
    );

    const ws = computed(() => auth.value.with(realtime()));
    const token = ref<AuthenticationData | null>(null);

    const errors = ref();
    return {
      auth,
      token,
      ws,
      errors,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies({ sameSite: 'lax' }),
    },
  }
);
