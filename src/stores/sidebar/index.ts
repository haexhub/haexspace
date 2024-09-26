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

  const menu = computed<ISidebarMenu>(() => ({
    top: [
      {
        label: t('sidebar.profile'),
        icon: 'i-[material-symbols--person-outline]',
        to: { name: 'profile' },
      },
      {
        label: t('sidebar.keepass'),
        icon: 'i-[mdi--safe]',
        to: { name: 'keepass' },
      },
      {
        label: t('sidebar.files'),
        icon: 'i-[ph--folder-open]',
        to: { name: 'files' },
        submenu: [{ label: 'demo' }],
      },
      {
        label: t('sidebar.settings'),
        icon: 'i-[ph--gear-six]',
        to: { name: 'settings' },
      },
    ],

    bottom: [
      {
        label: t('sidebar.logout'),
        icon: 'i-[ph--arrow-square-right]',
        click: logoutAsync,
      },
    ],
  }));

  const show = ref(false);

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
