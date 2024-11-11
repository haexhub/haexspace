export const useUi = defineStore(
  'uiStore',
  () => {
    const isDark = ref(false);
    const minWidth = 'min-w-xs';

    return {
      isDark,
      minWidth,
    };
  },
  { persist: true }
);
