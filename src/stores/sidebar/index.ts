import type { RouteLocationAsRelativeGeneric } from '#vue-router';
import de from './de.json';
import en from './en.json';

export interface ISidebarMenuItem {
  label: string;
  icon?: string;
  to?: Partial<RouteLocationAsRelativeGeneric>;
  click?: () => void;
  submenu?: ISidebarMenuItem[];
}

export interface ISidebarMenu {
  top: ISidebarMenuItem[];
  bottom: ISidebarMenuItem[];
}

export const useSidebar = defineStore('sidebarStore', () => {
  const { t } = useI18n({
    messages: {
      de: { sidebar: de },
      en: { sidebar: en },
    },
  });

  const { lastStorageProvider } = useStorageProvider();
  const menu = computed<ISidebarMenu>(() => ({
    top: [
      {
        label: t('sidebar.files'),
        icon: 'i-[ph--folder-open]',
        to: {
          name: 'folders',
          params: { provider: lastStorageProvider.value.slug },
        },
        submenu: [{ label: 'demo' }],
      },
      {
        label: t('sidebar.keepass'),
        icon: 'i-[mdi--safe]',
        to: { name: 'keepass' },
      },
    ],

    bottom: [
      {
        label: t('sidebar.settings'),
        icon: 'i-[ph--gear-six]',
        to: { name: 'settings' },
      },
      {
        label: t('sidebar.profile'),
        icon: 'i-[material-symbols--person-outline]',
        to: { name: 'profile' },
      },
      {
        label: t('sidebar.logout'),
        icon: 'i-[ph--arrow-square-right]',
        click: logoutAsync,
      },
    ],
  }));

  const show = ref(true);

  const toogleSidebar = () => {
    show.value = !show.value;
  };

  const { logoutAsync } = useUserStore();

  return {
    menu,
    toogleSidebar,
    show,
  };
});
