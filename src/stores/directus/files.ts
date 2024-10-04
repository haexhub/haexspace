import {
  uploadFiles,
  type AssetsQuery,
  type DirectusFile,
  type Query,
} from '@directus/sdk';

import type { Schema } from 'zod';
import type { ITableFile } from '~/components/ui/Table/table';

export const useFileStore = defineStore('fileStore', () => {
  const displayFiles = ref<DirectusFile[]>([]);
  const errors = ref<unknown[]>([]);

  const syncFilesAsync = async (query?: Query<Schema, DirectusFile>) => {
    try {
      displayFiles.value = await readFilesAsync(query);
      return displayFiles.value;
    } catch (error) {}
  };

  return {
    displayFiles,
    errors,
    filesToTable,
    getImageAsync,
    getThumbnailAsync,
    readFilesAsync,
    syncFilesAsync,
    uploadFilesAsync,
  };
});

const readFileAsync = async (
  fileId: string,
  query?: Query<Schema, DirectusFile>
) => {
  try {
    const { auth } = storeToRefs(useDirectusStore());
    const file = await auth.value.request(readFile(fileId, query));
    return file as DirectusFile;
  } catch (error) {
    console.log('ERROR readFilesAsync', error);
    return null;
  }
};

const readFilesAsync = async (query?: Query<Schema, DirectusFile>) => {
  try {
    const { auth } = storeToRefs(useDirectusStore());
    const files = await auth.value.request(readFiles(query));
    return files as DirectusFile[];
  } catch (error) {
    console.log('ERROR readFilesAsync', error);
    return [];
  }
};

const getThumbnailAsync = async (fileId: string) => {
  try {
    if (!fileId) return;

    const { auth } = storeToRefs(useDirectusStore());
    const stream = await auth.value.request(
      readAssetRaw(fileId, { quality: 30 })
    );
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

const getImageAsync = async (fileId: string, query?: AssetsQuery) => {
  try {
    if (!fileId) return;
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

const uploadFilesAsync = async (files?: FileList | null) => {
  console.log('uupload files', files);
  if (!files) return;

  const { auth } = storeToRefs(useDirectusStore());

  for (let index = 0; index < files.length; index++) {
    const file = files.item(index);
    if (!file) return;
    console.log('upload file', file);
    const formData = new FormData();
    formData.append('file', file, file.name);

    const res = await auth.value.request(uploadFiles(formData));
    console.log('finish upload ', res);
  }
};

const filesToTable = (files: DirectusFile[]): ITableFile[] => {
  console.log('files', files);
  return files.map((file) => ({
    id: file.id,
    name: file.filename_download,
    size: file.filesize,
    modified: file.modified_on,
    type: file.type,
  }));
};
