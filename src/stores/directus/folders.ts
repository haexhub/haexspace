import { createFolder, type DirectusFolder, type Query } from '@directus/sdk';
import type { Schema } from 'zod';
import type { ITableFile } from '~/components/ui/Table/table';

export const useFolderStore = defineStore('folderStore', () => {
  const allFolders = ref<DirectusFolder[]>([]);

  const folderTree = computed(() => createFolderTree(null, allFolders.value));

  const route = useRoute();
  const currentFolderId = computed(() => {
    console.log('new folder id', route.params.id);
    if (route.meta.name === 'folders') {
      return getSingleParam(route.params.id);
    }
    return null;
  });

  const currentFolder = computed(() =>
    allFolders.value.find((folder) => folder.id === currentFolderId.value)
  );

  const currentFolderContent = ref<ITableFile[]>([]);

  /*  = computedAsync(
    async () => {
      console.log('sync contetn', currentFolderId.value);
      const files = currentFolderId.value
        ? await readFilesAsync({
            filter: { folder: { _eq: currentFolderId.value } },
          })
        : [];
      console.log('files synced');
      const folders = currentFolderId.value
        ? await readFoldersAsync({
            filter: { parent: { _eq: currentFolderId.value } },
          })
        : [];
      const filesForTable = filesToTable(files);
      const folderForTable = foldersToTable(folders);
      console.log('size', folderForTable.length, filesForTable.length);
      return [...folderForTable, ...filesForTable];
    },
    [],
    { lazy: true }
  ); */

  const getFolderContentAsync = async () => {
    const { filesToTable, readFilesAsync } = useFileStore();
    console.log('getFolderContentAsync', currentFolderId.value);
    const files = currentFolderId.value
      ? await readFilesAsync({
          filter: { folder: { _eq: currentFolderId.value } },
        })
      : [];
    const folders = currentFolderId.value
      ? await readFoldersAsync({
          filter: { parent: { _eq: currentFolderId.value } },
        })
      : [];
    const filesForTable = filesToTable(files);
    const folderForTable = foldersToTable(folders);
    //currentFolderContent.value = [...folderForTable, ...filesForTable];
    return [...folderForTable, ...filesForTable];
  };
  const breadCrumbs = computed(() => getParentIds(currentFolder.value));

  const getParentIds = (folder?: DirectusFolder | null): string[] => {
    if (!folder) return [];
    //console.log('getParentIds', folder.name);

    const parent = allFolders.value.find(
      (parent) => parent.id === folder.parent
    );
    return [folder?.id, ...getParentIds(parent)];
  };

  const readAllFoldersAsync = async () => {
    allFolders.value = await readFoldersAsync();
    return allFolders.value;
  };

  //watch(currentFolderId, syncFolderContent, { immediate: true });

  return {
    allFolders,
    breadCrumbs,
    createFolderAsync,
    currentFolder,
    currentFolderContent,
    currentFolderId,
    foldersToTable,
    folderTree,
    getFolderContentAsync,
    navigateToFolderId,
    readAllFoldersAsync,
    readFoldersAsync,
  };
});

const readFoldersAsync = async (
  query?: Query<Schema, DirectusFolder>
): Promise<DirectusFolder[]> => {
  try {
    const { auth } = storeToRefs(useDirectusStore());
    return (await auth.value.request(readFolders(query))) as DirectusFolder[];
  } catch (error) {
    console.log('error', error);
    return [];
  }
};

const createFolderAsync = async (folder: Partial<DirectusFolder>) => {
  const { auth } = useDirectusStore();
  return (await auth.request(createFolder(folder))) as DirectusFolder;
};

export interface IFolderTree {
  id: string;
  name: string;
  parent: string | null | undefined;
  children?: IFolderTree[];
}

const createFolderTree = (
  parentId: string | null,
  folders: DirectusFolder[] = []
): IFolderTree[] | undefined => {
  const filteredFolders = folders.filter((folder) => folder.parent != parentId);

  const _folders = folders.filter((folder) => folder.parent == parentId);
  //console.log('search for', parentId, _folders);

  if (_folders.length > 0)
    return _folders.map((folder) => ({
      id: folder.id,
      name: folder.name,
      parent: parentId,
      children: createFolderTree(folder.id, filteredFolders),
    }));
  return undefined;
};

const foldersToTable = (folders: DirectusFolder[]): ITableFile[] =>
  folders.map((folder) => ({
    id: folder.id,
    name: folder.name,
    size: 'N/A',
    modified: null,
    isDirectory: true,
  }));

const moveFolderToTrash = () => {};

const navigateToFolderId = async (id: string) => {
  await navigateTo(useLocaleRoute()({ name: 'folder', params: { id } }));
};

/* computedAsync(async () => {
    console.log('fetch', currentFolderId.value);
    const { filesToTable, readFilesAsync } = useFileStore();
    const files = currentFolderId.value
      ? await readFilesAsync({
          filter: { folder: { _eq: currentFolderId.value } },
        })
      : [];
    const folders = currentFolderId.value
      ? await readFoldersAsync({
          filter: { parent: { _eq: currentFolderId.value } },
        })
      : [];
    const filesForTable = filesToTable(files);
    const folderForTable = foldersToTable(folders);
    return [...folderForTable, ...filesForTable];
  });
 */
