import { join } from '@tauri-apps/api/path';
import {
  BaseDirectory,
  readDir,
  type DirEntry,
  lstat,
} from '@tauri-apps/plugin-fs';
import type { ITableFile } from '~/components/ui/Table/table';

export const useTauriFolders = () => {
  const readDirectoryAsync = async (directory: string = '') => {
    console.log('read tauri folder', directory);
    return await readDir(directory, { baseDir: BaseDirectory.Home });
  };

  const getDirectoryAsync = async (folderId: string) => {
    const directories = (await readDirectoryAsync(folderId)).filter(
      (folder) => folder.isDirectory
    );
    return filesToTableAsync(folderId, directories);
  };

  const getDirectoryContentAsync = async (
    directory: string | null = ''
  ): Promise<ITableFile[]> => {
    const content = await readDirectoryAsync(directory ?? '');
    return filesToTableAsync(directory ?? '', content);
  };

  const navigateToDirectoryAsync = async (item: ITableFile) => {
    return navigateTo(
      useLocaleRoute()({
        name: 'folders',
        params: { folderId: item.id },
      })
    );
  };

  return {
    getDirectoryAsync,
    getDirectoryContentAsync,
    navigateToDirectoryAsync,
    readDirectoryAsync,
  };
};

const filesToTableAsync = async (
  parentFolder: string | null = '',
  items: DirEntry[]
): Promise<ITableFile[]> => {
  const result: ITableFile[] = [];
  try {
    for (const item of items) {
      try {
        const id = parentFolder
          ? await join(parentFolder, item.name)
          : item.name;
        const fileMeta = await lstat(id, { baseDir: BaseDirectory.Home });

        //console.log('fileMeta', fileMeta);
        result.push({
          id,
          type: item.isDirectory ? 'folder' : 'file',
          name: item.name,
          modified: fileMeta.mtime?.toString(),
          size: fileMeta.size.toString(),
        });
      } catch (error) {
        //console.error('meta error', error);
        continue;
      }
    }

    return result;
  } catch (error) {
    console.error('tauri fileToTable', error);
  }
  return result;
};
