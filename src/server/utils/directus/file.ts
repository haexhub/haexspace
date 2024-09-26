import { readAssetBlob, readFile, readFiles, uploadFiles } from '@directus/sdk';
import { H3Event } from 'h3';
import { useDirectusUser } from './user';

export const useDirectusFile = () => {
  return {
    readFileAsync,
    readFilesAsync,
    getThumbnailAsync,
    uploadFileAsync,
  };
};

const readFileAsync = async (event: H3Event) => {
  try {
    const { authAsync } = useDirectusUser();
    const { fileId, query } = await readBody(event);
    if (!fileId || typeof fileId !== 'string') return;

    const client = await authAsync(event);
    if (client) {
      const file = await client.request(readFile(fileId, query));
      return file;
    }
    return null;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

const readFilesAsync = async (event: H3Event) => {
  try {
    console.log('read files');
    const { authAsync } = useDirectusUser();
    const { query } = await readBody(event);
    const client = await authAsync(event);
    if (client) {
      const file = await client.request(readFiles(query));
      console.log('found files', file.length);
      return file;
    }
    return null;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

const getThumbnailAsync = async (event: H3Event) => {
  try {
    const { authAsync } = useDirectusUser();
    const { fileId, query } = await readBody(event);
    if (!fileId || typeof fileId !== 'string') return;

    const client = await authAsync(event);
    if (client) {
      const file = await client.request(readAssetBlob(fileId, query));

      return file;
    }
  } catch (error) {
    console.log('error thumbnail', error);
    return null;
  }
};

const uploadFileAsync = async (event: H3Event) => {
  const { authAsync } = useDirectusUser();
  const formData = await readFormData(event);
  const client = await authAsync(event);
  if (!client) return;

  return client.request(uploadFiles(formData));
};
