import {
  createFolder,
  readFolder,
  type DirectusFile,
  type DirectusFolder,
  type Query,
} from '@directus/sdk';
import type { Schema } from 'zod';
import type { ITableFile } from '~/components/ui/Table/table';

export const useDirectusFolders = () => {
  const allFolders = useState<DirectusFolder[]>('allDirectusFolders', () => []);

  const folderTree = computed(() => createFolderTree(null, allFolders.value));

  const route = useRoute();

  /* const currentFolderId = computed(() => {
    console.log('new folder id', route.params.folderId);
    if (route.meta.name === 'folders') {
      return getSingleParam(route.params.folderId);
    }
    return null;
  }); */

  const currentFolder = ref<DirectusFolder | null>(null);

  //const { currentFolderId } = useStorageProvider();
  /* watch(currentFolderId, async () => {
    if (currentFolderId.value) {
      currentFolder.value = await getDirectoryAsync(currentFolderId.value);
    }
  }); */

  const currentFolderContent = ref<ITableFile[]>([]);

  const getDirectoryContentAsync = async (folderId: string | null = null) => {
    const { readFilesAsync } = useDirectusFiles();

    const searchFolderId = folderId ? folderId : null;
    console.log('directus getDirectoryContentAsync', searchFolderId);
    const files = await readFilesAsync({
      filter: { folder: { _eq: searchFolderId } },
    });
    const folders = await readFoldersAsync({
      filter: { parent: { _eq: searchFolderId } },
    });

    const filesForTable = filesToTable(files);
    const folderForTable = foldersToTable(folders);

    return [...folderForTable, ...filesForTable];
  };

  const breadCrumbs = computed(() => getParentIds(currentFolder.value));

  const getParentIds = (folder?: DirectusFolder | null): string[] => {
    if (!folder) return [];

    const parent = allFolders.value.find(
      (parent) => parent.id === folder.parent
    );
    return [folder?.id, ...getParentIds(parent)];
  };

  const readAllFoldersAsync = async () => {
    console.log('read all folders');
    allFolders.value = await readFoldersAsync();
    return allFolders.value;
  };

  const currentFolderId = computed(() => {
    console.log('new directus folder id', route.params.folderId);
    if (route.meta.name === 'folders') {
      return getSingleParam(route.params.folderId);
    }
    return null;
  });

  return {
    allFolders,
    breadCrumbs,
    createFolderAsync,
    createFoldersAsync,
    currentFolder,
    currentFolderContent,
    currentFolderId,
    filesToTable,
    foldersToTable,
    folderTree,
    getDirectoryContentAsync,
    navigateToDirectoryAsync,
    pathSeperator,
    readAllFoldersAsync,
    getDirectoryAsync,
    readFoldersAsync,
  };
};

const getDirectoryAsync = async (
  folderId: string,
  query?: Query<Schema, DirectusFolder>
): Promise<ITableFile[]> => {
  try {
    const { auth } = useDirectusStore();
    const searchFolderId = folderId ? folderId : null;
    console.log('getDirectoryAsync', searchFolderId);
    const directory = await readFoldersAsync({
      filter: { parent: { _eq: searchFolderId } },
    });

    console.log('getDirectoryAsync', directory);
    return foldersToTable(directory);
  } catch (error) {
    console.log('error getDirectoryAsync', folderId, error);
    return [];
  }
};

const readFoldersAsync = async (
  query?: Query<Schema, DirectusFolder>
): Promise<DirectusFolder[]> => {
  try {
    const { auth } = useDirectusStore();
    return (await auth.request(readFolders(query))) as DirectusFolder[];
  } catch (error) {
    console.log('error readFoldersAsync', error);
    return [];
  }
};

const createFolderAsync = async (
  folder: Partial<DirectusFolder>,
  ifNotExists: boolean = true
) => {
  const { auth } = useDirectusStore();
  const { allFolders } = useDirectusFolders();
  const existingFolder = allFolders.value.find(
    (_folder) => _folder.parent == folder.parent && _folder.name === folder.name
  );

  if (!folder.name) return;
  if (ifNotExists && existingFolder) {
    console.log('folder exists', existingFolder);
    return existingFolder;
  }
  console.log('create new folder', folder);
  return (await auth.request(createFolder(folder))) as DirectusFolder;
};

const createFoldersAsync = async (
  folderNames: string[],
  parentFolder: Partial<DirectusFolder> = { parent: null }
) => {
  let lastParent = parentFolder;
  for (const name of folderNames) {
    if (!name) continue;
    console.log('create folder', name, 'in parent', lastParent);
    lastParent = (await createFolderAsync({
      name,
      parent: lastParent.id,
    })) ?? { parent: null };
    console.log('after', lastParent);
  }
  return lastParent;
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
    folder: folder.parent,
    id: folder.id,
    modified: null,
    name: folder.name,
    size: 'N/A',
    type: 'folder',
  }));

const moveFolderToTrash = () => {};

const navigateToDirectoryAsync = async (item: ITableFile) => {
  console.log('directus directory navigate', item);
  return navigateTo(
    useLocaleRoute()({
      name: 'folders',
      params: { folderId: item.id },
    })
  );
};

const pathSeperator = computed(() => {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Win') != -1) return '\\';
  else if (userAgent.indexOf('Mac') != -1) return '/';
  else if (userAgent.indexOf('Linux') != -1) return '/';
  else if (userAgent.indexOf('X11') != -1) return '/';
  return '/';
});

const filesToTable = (files: DirectusFile[]): ITableFile[] => {
  return files.map((file) => ({
    id: file.id,
    name: file.filename_download,
    size: file.filesize,
    modified: file.modified_on,
    type: file.type,
  }));
};
