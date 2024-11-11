export default defineEventHandler(async (event) => {
  console.log('file endpoint');
  const { uploadFileAsync } = useDirectusFile();
  try {
    const uploadedFiles = await uploadFileAsync(event);
    return uploadedFiles;
  } catch (error) {
    console.log('error files endpoint', error);
    return [];
  }
});
