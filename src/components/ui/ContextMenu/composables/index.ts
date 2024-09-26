import type { IContextMenuItem } from '~/components/ui/ContextMenu/types';
import de from './de.json';
import en from './en.json';

export const useContextMenu = () => {
  const { t } = useI18n({
    messages: {
      de,
      en,
    },
  });

  const dialog = reactive({
    folder: {
      create: false,
    },
  });

  const fileMenu: IContextMenuItem[] = [
    {
      label: t('create.folder'),
      handler: () => {
        dialog.folder.create = true;
      },
    },
    {
      label: t('create.file'),
      handler: () => {
        dialog.folder.create = true;
      },
      serperator: true,
    },
    {
      label: t('upload.files'),
      handler: () => {
        dialog.folder.create = true;
      },
    },
    {
      label: t('upload.folders'),
      handler: () => {
        dialog.folder.create = true;
      },
    },
  ];

  const folderMenu: IContextMenuItem[] = [
    { label: t('folder.download') },
    { label: t('folder.rename'), serperator: true },
    { label: t('folder.trash') },
  ];

  return {
    dialog,
    fileMenu,
    folderMenu,
  };
};
