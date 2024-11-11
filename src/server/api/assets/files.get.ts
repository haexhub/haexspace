export default defineEventHandler(async (event) => {
  console.log('file endpoint');
  const { readFilesAsync } = useDirectusFile();
  try {
    const files = await readFilesAsync(event);
    return files;
  } catch (error) {
    console.log('error files endpoint', error);
    return [];
  }
});
