export const useTauri = () => {
  const isTauri = '__TAURI_INTERNALS__' in globalThis; // running on a desktop app or a mobile app - but not in the browser
  const isWeb = !isTauri; // running on the browser on either desktop or mobile - but not as a tauri app
  const isMobile = navigator?.maxTouchPoints > 0; // running in mobile either in the browser or as a tauri app
  const isDesktop = !isMobile; // running in desktop either in the browser or as a tauri app
  const isTauriMobile = isTauri && isMobile; // running on mobile as a tauri app - but not on the browser
  const isTauriDesktop = isTauri && isDesktop; // running on desktop as a tauri app - but not on the browser
  const isWebMobile = isWeb && isMobile; // running on mobile in the browser - but not as a tauri app
  const isWebDesktop = isWeb && isDesktop; // running on desktop in the browser - but not as a tauri app

  return {
    isDesktop,
    isMobile,
    isTauri,
    isTauriDesktop,
    isTauriMobile,
    isWeb,
    isWebDesktop,
    isWebMobile,
  };
};
