interface IBottomMenuItem {
  label: string;
  icon?: string;
  action: () => Promise<void>;
}

interface IBottomMenu {
  show: boolean;
  items: IBottomMenuItem[];
}

export const useBottomMenuStore = defineStore('bottomMenuStore', () => {
  const mainMenu = reactive<IBottomMenu>({
    show: false,
    items: [
      {
        label: 'Create Folder',
        action: async () => {
          alert('boom');
        },
        icon: 'i-[mdi--folder-plus-outline]',
      },
      {
        label: 'Create File',
        action: async () => {
          alert('boom');
        },
        icon: 'i-[mdi--file-document-plus-outline]',
      },
    ],
  });

  const leftMenu = reactive<IBottomMenu>({
    show: false,
    items: [],
  });

  const rightMenu = reactive<IBottomMenu>({
    show: false,
    items: [],
  });

  return {
    mainMenu,
    rightMenu,
    leftMenu,
  };
});
