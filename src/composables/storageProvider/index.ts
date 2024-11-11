import type { ITableFile } from '~/components/ui/Table/table';
import type { RouteLocationRaw } from '#vue-router';
export interface IStorageProviderItem {
  name: string;
  slug: string;
  icon?: string;
}

export interface IBreadCrumb {
  to: RouteLocationRaw;
  label: string;
}

export const useStorageProvider = () => {
  const { isTauri } = useTauri();
  const { haexSpaceProvider, haexSpaceSlug } = useDirectusFolders();
  //const haexSpaceSlug = 'haexSpace';
  const tauriSlug = 'local';

  /* const haexSpaceProvider = {
    name: 'HaexSpace',
    slug: haexSpaceSlug,
    icon: 'i-[game-icons--squirrel]',
  }; */

  const tauriProvider = {
    name: 'Local',
    slug: tauriSlug,
    icon: 'i-[emojione-v1--floppy-disk]',
  };

  const availableProvider = computed(() => {
    const providers = [haexSpaceProvider];
    if (isTauri) {
      providers.push(tauriProvider);
    } else {
    }
    return providers;
  });

  const route = useRoute();
  const router = useRouter();

  const lastStorageProvider = useState<IStorageProviderItem>(
    'lastStorageProvider',
    () => haexSpaceProvider
  );

  const getStorageProvider = (providerSlug: string | null = haexSpaceSlug) => {
    //console.log('getStorageProvider', providerSlug);
    return (
      availableProvider.value.find(
        (_provider) => _provider.slug === providerSlug
      ) ?? haexSpaceProvider
    );
  };

  const setStorageProvider = (providerSlug: string | null = haexSpaceSlug) => {
    if (providerSlug === lastStorageProvider.value.slug) return;
    //console.log('set provider', providerSlug, route.params.provider);
    const provider = getStorageProvider(providerSlug);
    const newRoute = { ...route };
    newRoute.params = { provider: provider.slug };
    router.push(newRoute);
    //route.params.provider = provider.slug;
  };

  const currentStorageProvider = computed({
    get: () => {
      console.log('compute currentStorageProvider', route.params.provider);

      const providerSlug = getStorageProvider(
        getSingleParam(route.params.provider)
      ).slug;
      if (route.path.startsWith('/private/storage')) {
        return getStorageProvider(providerSlug);
      }
    },
    set: (newStorageProvider) => {
      setStorageProvider(newStorageProvider?.slug);
    },
  });

  watch(
    currentStorageProvider,
    () => {
      if (currentStorageProvider.value)
        lastStorageProvider.value = currentStorageProvider.value;
    },
    { immediate: true }
  );

  const currentFolderId = computed(() => {
    const folderIds = route.params.folderId;
    const folderIdsParam = Array.isArray(folderIds)
      ? folderIds.map((id) => id).join('/')
      : folderIds;
    console.log('new folder id', route.params.folderId, folderIdsParam);
    if (route.meta.name === 'folders') {
      return folderIdsParam;
    }
    return null;
  });

  const {
    getDirectoryContentAsync: directusContent,
    navigateToDirectoryAsync: directusNavigate,
    getDirectoryAsync: directusDirectory,
    getChildDirectoriesAsync: directusChildDirectories,
    breadCrumbs: directusBreadCrumbs,
    getFolderName: directusFolderName,
    initAsync: directusInit,
  } = useDirectusFolders();

  const {
    getDirectoryContentAsync: tauriContent,
    navigateToDirectoryAsync: tauriNavigate,
    getDirectoryAsync: tauriDirectory,
    getChildDirectoriesAsync: tauriChildDirectories,
    breadCrumbs: tauriBreadCrumbs,
    getFolderName: tauriFolderName,
    initAsync: tauriInit,
  } = useTauriFolders();

  const providerFunctions = (providerSlug?: string | null) => {
    const slug = providerSlug ?? lastStorageProvider.value?.slug;

    switch (slug) {
      case tauriSlug:
        return {
          breadCrumbs: tauriBreadCrumbs,
          childDirectoriesAsync: tauriChildDirectories,
          directoryAsync: tauriDirectory,
          directoryContentAsync: tauriContent,
          getFolderName: tauriFolderName,
          initAsync: tauriInit,
          navigateToDirectoryAsync: tauriNavigate,
        };

      default:
        return {
          breadCrumbs: directusBreadCrumbs,
          childDirectoriesAsync: directusChildDirectories,
          directoryAsync: directusDirectory,
          directoryContentAsync: directusContent,
          getFolderName: directusFolderName,
          initAsync: directusInit,
          navigateToDirectoryAsync: directusNavigate,
        };
    }
  };

  const getChildDirectoriesAsync = (
    item: ITableFile
  ): Promise<ITableFile[]> | ITableFile[] => {
    /* const { providerFunctions, currentFolderId } = useStorageProvider();
  const childDirectoriesAsync = providerFunctions().childDirectoriesAsync; */
    try {
      return providerFunctions().childDirectoriesAsync(
        item,
        currentFolderId.value
      );
    } catch (error) {
      console.error('getChildDirectoriesAsync', error);
      return [];
    }
  };

  const breadCrumbs = providerFunctions().breadCrumbs;

  const getFolderName = providerFunctions().getFolderName;

  return {
    availableProvider,
    breadCrumbs,
    currentFolderId,
    currentStorageProvider,
    getChildDirectoriesAsync,
    getDirectoryAsync,
    getDirectoryContentAsync,
    getFolderName,
    haexSpaceProvider,
    haexSpaceSlug,
    lastStorageProvider,
    providerFunctions,
    tauriProvider,
    tauriSlug,
  };
};

const getDirectoryContentAsync = async (
  parentDirectory?: string | null,
  sortBy: keyof ITableFile = 'name'
) => {
  const { providerFunctions, currentStorageProvider } = useStorageProvider();

  console.log(
    'getDirectoryContentAsync all',
    parentDirectory,
    currentStorageProvider.value?.name
  );
  const directoryContentAsync = providerFunctions().directoryContentAsync;
  try {
    return (await directoryContentAsync(parentDirectory)).sort((a, b) =>
      sortDirectory(a, b, sortBy)
    );
  } catch (error) {
    console.error('getDirectoryContentAsync', error);
    return [];
  }
};

const sortDirectory = (
  a: ITableFile,
  b: ITableFile,
  sortBy: keyof ITableFile = 'name'
) => {
  if (a.type === 'folder' && b.type !== 'folder') return -1;
  if (b.type === 'folder' && a.type !== 'folder') return 1;

  return (a['name']?.toLocaleLowerCase() ?? '')?.localeCompare(
    b['name']?.toLocaleLowerCase() ?? ''
  );
};

const getDirectoryAsync = async (folderId: string) => {
  const directoryAsync =
    useStorageProvider().providerFunctions().directoryAsync;
  return (await directoryAsync(folderId)).sort((a, b) => sortDirectory(a, b));
};

const fileTypes = new Map<string, string>([['folder', 'folder']]);
