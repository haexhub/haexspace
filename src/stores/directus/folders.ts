import { createFolder, type DirectusFolder, type Query } from '@directus/sdk';
import type { Schema } from 'zod';

export const useFolderStore = defineStore('folderStore', () => {
  const folders = ref<DirectusFolder[]>([]);

  const folderTree = computed(() => createFolderTree(null, folders.value));

  const currentFolderId = computed(() => {
    const route = useRoute();
    if (route.meta.name === 'folder')
      return Array.isArray(route.params.id)
        ? route.params.id.at(0)
        : route.params.id;
    return null;
  });

  const currentFolder = computed(() =>
    folders.value.find((folder) => folder.id === currentFolderId.value)
  );

  const parentChain = computed(() => getParentIds(currentFolder.value));

  const getParentIds = (folder?: DirectusFolder | null): string[] => {
    if (!folder) return [];

    const parent = folders.value.find((parent) => parent.id === folder.parent);
    return [folder?.id, ...getParentIds(parent)];
  };

  const errors = ref<unknown[]>([]);

  const syncFoldersAsync = async (query?: Query<Schema, DirectusFolder>) => {
    folders.value = await readFoldersAsync(query);
    return folders.value;
  };

  return {
    createFolderAsync,
    currentFolder,
    currentFolderId,
    errors,
    folders,
    folderTree,
    parentChain,
    readFoldersAsync,
    syncFoldersAsync,
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
  await auth.request(createFolder(folder));
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
  console.log('search for', parentId, folders);
  const filteredFolders = folders.filter((folder) => folder.parent != parentId);

  const _folders = folders.filter((folder) => folder.parent == parentId);

  if (_folders.length > 0)
    return _folders.map((folder) => ({
      id: folder.id,
      name: folder.name,
      parent: parentId,
      children: createFolderTree(folder.id, filteredFolders),
    }));
  return undefined;
};
