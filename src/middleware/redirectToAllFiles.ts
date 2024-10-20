export default defineNuxtRouteMiddleware(async (to, from) => {
  //console.log('going to', to.meta.name);
  const localeRoute = useLocaleRoute();
  if (to.meta.name === 'files' && from.meta.name !== 'folders')
    return navigateTo(localeRoute({ name: 'folders' }));
});
