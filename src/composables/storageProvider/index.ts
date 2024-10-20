import type { ITableFile } from '~/components/ui/Table/table';

interface IStorageProviderItem {
  name: string;
  slug: string;
  icon?: string;
}

export const useStorageProvider = () => {
  const { isWeb, isTauri } = useTauri();

  const haexSpaceSlug = 'haexSpace';
  const tauriSlug = 'native';

  const haexSpaceProvider = {
    name: 'HaexSpace',
    slug: haexSpaceSlug,
    icon: 'i-[game-icons--squirrel]',
  };

  const tauriProvider = {
    name: 'Native',
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
    console.log('getStorageProvider', providerSlug);
    return (
      availableProvider.value.find(
        (_provider) => _provider.slug === providerSlug
      ) ?? haexSpaceProvider
    );
  };

  const setStorageProvider = (providerSlug: string | null = haexSpaceSlug) => {
    if (providerSlug === lastStorageProvider.value.slug) return;
    console.log('set provider', providerSlug, route.params.provider);
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

      console.log(
        'set lastProvider',
        currentStorageProvider.value,
        lastStorageProvider.value
      );
    },
    { immediate: true }
  );

  const currentFolderId = computed(() => {
    console.log('new folder id', route.params.folderId);
    const folderIds = route.params.folderId;
    const folderIdsParam = Array.isArray(folderIds)
      ? folderIds.join('/')
      : folderIds;
    if (route.meta.name === 'folders') {
      return folderIdsParam;
    }
    return null;
  });

  const {
    getDirectoryContentAsync: directusContent,
    navigateToDirectoryAsync: directusNavigate,
    getDirectoryAsync: directusDirectory,
  } = useDirectusFolders();
  const {
    getDirectoryContentAsync: tauriContent,
    navigateToDirectoryAsync: tauriNavigate,
    getDirectoryAsync: tauriDirectory,
  } = useTauriFolders();

  const providerFunctions = (providerSlug?: string | null) => {
    const slug = providerSlug ?? lastStorageProvider.value?.slug;
    console.log('providerFunctions', slug);
    switch (slug) {
      case haexSpaceSlug:
        return {
          directoryContentAsync: directusContent,
          navigateToDirectoryAsync: directusNavigate,
          directoryAsync: directusDirectory,
        };

      case tauriSlug:
        return {
          directoryContentAsync: tauriContent,
          navigateToDirectoryAsync: tauriNavigate,
          directoryAsync: tauriDirectory,
        };

      default:
        return {
          directoryContentAsync: directusContent,
          navigateToDirectoryAsync: directusNavigate,
          directoryAsync: directusDirectory,
        };
    }
  };

  return {
    availableProvider,
    currentFolderId,
    currentStorageProvider,
    getDirectoryAsync,
    getDirectoryContentAsync,
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
  const { providerFunctions } = useStorageProvider();

  const directoryContentAsync = providerFunctions().directoryContentAsync;
  try {
    return (await directoryContentAsync(parentDirectory)).sort(
      (a, b) => sortDirectory(a, b, sortBy)
      /* {
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (b.type === 'folder' && a.type !== 'folder') return 1;

      return (a[sortBy]?.toLocaleLowerCase() ?? '')?.localeCompare(
        b[sortBy]?.toLocaleLowerCase() ?? ''
      );
    } */
    );
  } catch (error) {
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

  return (a[sortBy]?.toLocaleLowerCase() ?? '')?.localeCompare(
    b[sortBy]?.toLocaleLowerCase() ?? ''
  );
};

const getDirectoryAsync = async (folderId: string) => {
  const directoryAsync =
    useStorageProvider().providerFunctions().directoryAsync;
  return (await directoryAsync(folderId)).sort((a, b) => sortDirectory(a, b));
};

const fileTypes = new Map<string, string>([['folder', 'folder']]);
