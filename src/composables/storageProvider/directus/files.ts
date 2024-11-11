import {
  deleteFile,
  uploadFiles,
  type AssetsQuery,
  type DirectusFile,
  type Query,
} from '@directus/sdk';

import type { Schema } from 'zod';

export const useDirectusFiles = () => {
  return {
    deleteFileAsync,
    getImageAsync,
    getThumbnailAsync,
    readFilesAsync,
    uploadFileAsync,
    uploadFilesAsync,
  };
};

const readFileAsync = async (
  fileId: string,
  query?: Query<Schema, DirectusFile>
) => {
  try {
    const { auth } = useDirectusStore();
    const file = await auth.request(readFile(fileId, query));
    return file as DirectusFile;
  } catch (error) {
    console.log('ERROR readFilesAsync', error);
    return null;
  }
};

const readFilesAsync = async (query?: Query<Schema, DirectusFile>) => {
  try {
    const { auth } = useDirectusStore();
    const files = await auth.request(readFiles(query));
    return files as DirectusFile[];
  } catch (error) {
    console.log('ERROR readFilesAsync', error);
    return [];
  }
};

const getThumbnailAsync = async (fileId: string) => {
  try {
    if (!fileId) return;

    const { auth } = useDirectusStore();
    const stream = await auth.request(readAssetRaw(fileId, { quality: 30 }));
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
    const { auth } = useDirectusStore();
    const stream = await auth.request(readAssetRaw(fileId, query));
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

const uploadFileAsync = async (file?: File | null, folderId?: string) => {
  console.log('upload file', file, 'in folder', folderId);
  if (!file) return;

  const { auth } = useDirectusStore();

  const formData = new FormData();

  if (folderId) formData.append('folder', folderId);
  formData.append('file', file, file.name);

  const res = await auth.request(uploadFiles(formData));
  console.log('finish upload ', res);
};

const uploadFilesAsync = async (files?: FileList | null, folderId?: string) => {
  console.log('uupload files', files);
  if (!files) return;

  //const { auth } = storeToRefs(useDirectusStore());

  for (let index = 0; index < files.length; index++) {
    await uploadFileAsync(files.item(index), folderId);
    /* const file = files.item(index);
    if (!file) return;
    console.log('upload file', file);
    const formData = new FormData();

    if (folderId) formData.append('folder', folderId);
    formData.append('file', file, file.name);

    const res = await auth.value.request(uploadFiles(formData));
    console.log('finish upload ', res); */
  }
};

const deleteFileAsync = async (file_id: string) => {
  const { auth } = useDirectusStore();
  await auth.request(deleteFile(file_id));
};
