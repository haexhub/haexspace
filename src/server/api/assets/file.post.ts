export default defineEventHandler(async (event) => {
  console.log('file endpoint');
  const { readFileAsync } = useDirectusFile();

  const formData = await readFormData(event);

  try {
    return await readFileAsync(event);
  } catch (error) {
    console.log('error files endpoint', error);
    return [];
  }
});
