import { useDirectusFile } from '~/server/utils/directus/file';

export default defineEventHandler(async (event) => {
  const { getThumbnailAsync } = useDirectusFile();
  const response = await getThumbnailAsync(event);
  /* if (response) {
    const base64 = atob(response);

    return base64;
  } */
  console.log('thumbnail', response);
  const arryBuffer = await response?.arrayBuffer();
  if (arryBuffer) {
    console.log('send arraybuffer');
    return send(event, new Uint8Array(arryBuffer), response?.type);
  }
  return send(event, new Uint8Array(), response?.type);
});
