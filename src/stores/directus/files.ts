import { type AssetsQuery, type DirectusFile, type Query } from '@directus/sdk';
import de from './de.json';
import en from './en.json';
import type { Schema } from 'zod';

export const useFileStore = defineStore('fileStore', () => {
  const displayFiles = ref<DirectusFile[]>([]);
  const errors = ref<unknown[]>([]);

  return {
    columns,
    displayFiles,
    errors,
    filesToTable,
    getThumbnailAsync,
    readFilesAsync,
    setDisplayFilesAsync,
    uploadFilesAsync,
  };
});

const readFileAsync = async (
  fileId: string,
  query?: Query<Schema, DirectusFile>
) => {
  try {
    console.log('read files', query);
    const { auth } = storeToRefs(useDirectusStore());
    const file = await auth.value.request(readFile(fileId, query));
    console.log('found file', file);
    return file as DirectusFile;
  } catch (error) {
    console.log('ERROR readFilesAsync', error);
    return null;
  }
};

const readFilesAsync = async (query?: Query<Schema, DirectusFile>) => {
  try {
    console.log('read files', query);
    const { auth } = storeToRefs(useDirectusStore());
    const files = await auth.value.request(readFiles(query));
    console.log('found files', files.length);
    return files as DirectusFile[];
  } catch (error) {
    console.log('ERROR readFilesAsync', error);
    return [];
  }
};

const getThumbnailAsync = async (fileId: string, query?: AssetsQuery) => {
  try {
    const { auth } = storeToRefs(useDirectusStore());
    const stream = await auth.value.request(readAssetRaw(fileId, query));
    const reader = stream?.getReader();
    const data = await reader?.read();

    const file = await readFileAsync(fileId, { fields: ['filename_download'] });
    console.log('thumbnail data', data?.value);
    console.log('file data', file);
    if (data?.value) {
      return {
        src: await bytesToBase64DataUrlAsync(data?.value),
        alt: file?.filename_download,
      };
    }
    return {
      src: '',
      alt: file?.filename_download,
    };
  } catch (error) {
    console.log('ERROR getThumbnailAsync', error);
    return null;
  }
};

const uploadFilesAsync = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  /* const upload = await $fetch<Record<string, any> | undefined>(
    '/api/assets/files',
    {
      method: 'POST',
      body: formData,
    }
  );
  return upload; */
};

const setDisplayFilesAsync = async (query?: Query<Schema, DirectusFile>) => {
  try {
    const { displayFiles } = storeToRefs(useFileStore());
    displayFiles.value = await readFilesAsync(query);
  } catch (error) {}
};

const filesToTable = (files: DirectusFile[]) =>
  files.map((file) => ({
    name: file.filename_download,
    size: file.filesize,
    modified: file.modified_on,
    isDirectory: file.folder,
  }));

const columns = computed(() => {
  const { locale, t } = useI18n({
    messages: {
      de,
      en,
    },
  });

  return [
    {
      prop: 'name',
      label: t('files.table.name'),
    },
    {
      prop: 'size',
      label: t('files.table.size'),
      formatter: (item: string) => readableFileSize(item),
    },
    {
      prop: 'modified',
      label: t('files.table.modified_at'),
      formatter: (item?: string | null) => {
        console.log('locale', locale.value);
        if (item) {
          return new Date(item).toLocaleDateString(locale.value, {
            dateStyle: 'short',
          });
        }
        return '';
      },
    },
  ];
});
