import {
  BaseDirectory,
  readDir,
  readFile,
  type DirEntry,
  lstat,
  exists,
} from '@tauri-apps/plugin-fs';
import type { IBreadCrumb } from '..';
import type { ITableFile } from '~/components/ui/Table/table';

export const useTauriFolders = () => {
  const readDirectoryAsync = async (
    directory: string = '',
    recursive: boolean = false
  ) => {
    /* const exi = await exists('test.md', { baseDir: BaseDirectory.Home });
    console.log('exists', exi);
    if (exi) {
      const file = await readFile('test.md', { baseDir: BaseDirectory.Home });
      console.log('file', file);
    } */
    //const dir = await readDir(await homeDir());
    const file = await readFile('test.md', { baseDir: BaseDirectory.Desktop });
    console.log('file', file);
    const dir = await readDir('', { baseDir: BaseDirectory.Home });
    console.log('tauri readDirectoryAsync', directory, dir);
    return dir;
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
    console.log('tauri readDirectoryAsync dir', directory);
    const content = await readDirectoryAsync(directory ?? '');
    console.log('tauri getDirectoryContentAsync', content);
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

  const route = useRoute();

  const breadCrumbs = computed<IBreadCrumb[]>(() => {
    console.log('bread', route.params.folderId);
    if (!route.params.folderId) return [];
    const folderId = getSingleParam(route.params.folderId); //Array.isArray(route.params.folderId)
    /* ? route.params.folderId
      : [route.params.folderId]; //getSingleParam(route.params.folderId); */
    const folderIds = Array.isArray(route.params.folderId)
      ? route.params.folderId.flatMap((id) => id.split('/'))
      : route.params.folderId?.split('/'); //folderId ? folderId.split('/').map((id) => id) : [];
    console.log('tauri bread ids', folderIds, folderId, route.params.folderId);
    let index = 0;
    return folderIds.length
      ? folderIds.map((id) => {
          index++;
          return {
            to: {
              name: 'folders',
              params: {
                folderId: folderIds
                  .slice(0, index)
                  .map((id) => id)
                  .join('/'),
              },
            },
            label: id,
          };
        })
      : [];
  });

  const getFolderName = (folderId: string) => folderId.split('/').at(-1) ?? '';

  const initAsync = async () => {};

  return {
    breadCrumbs,
    getDirectoryAsync,
    getFolderName,
    getChildDirectoriesAsync,
    getDirectoryContentAsync,
    initAsync,
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
          ? parentFolder.concat('/').concat(item.name)
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
        console.error('meta error', error);
        continue;
      }
    }

    return result;
  } catch (error) {
    console.error('tauri fileToTable', error);
  }
  return result;
};

const getChildDirectoriesAsync = async (
  item: ITableFile,
  currentFolderId: string | null
) => {
  const { getDirectoryAsync } = useTauriFolders();
  const childDirectoryId = currentFolderId
    ? `${currentFolderId}/${item.id}`
    : item.id;
  console.log('read child', childDirectoryId);
  return getDirectoryAsync(childDirectoryId);

  return [];
  //return getDirectoryAsync(childDirectoryId);
};
