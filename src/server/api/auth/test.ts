export default defineEventHandler((event) => {
  const s = getCookie(event, 'access_token');
  console.log('found access_token', s);
});
