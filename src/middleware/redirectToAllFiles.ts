export default defineNuxtRouteMiddleware(async (to, _from) => {
  console.log('going to', to.meta.name);
  const localeRoute = useLocaleRoute();
  if (to.meta.name === 'files')
    return navigateTo(localeRoute({ name: 'allFiles' }));
});
