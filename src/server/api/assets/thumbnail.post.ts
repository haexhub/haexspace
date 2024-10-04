//import { useDirectusFile } from '~/server/old_utils/directus/file';

export default defineEventHandler(async (event) => {
  /* const { getThumbnailAsync } = useDirectusFile();
  const response = await getThumbnailAsync(event);
  
  console.log('thumbnail', response);
  const arryBuffer = await response?.arrayBuffer();
  if (arryBuffer) {
    console.log('send arraybuffer');
    return send(event, new Uint8Array(arryBuffer), response?.type);
  }
  return send(event, new Uint8Array(), response?.type); */
});
