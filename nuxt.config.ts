// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Haex Space',

      meta: [
        {
          name: 'description',
          content: 'Use your own private cloud',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
    },
  },

  srcDir: './src',

  compatibilityDate: '2024-07-03',

  devtools: { enabled: true, componentInspector: false },

  i18n: {
    strategy: 'prefix_and_default',
    defaultLocale: 'de',
    lazy: false,
    langDir: 'i18n',
    locales: [
      { code: 'de', file: 'de.ts' },
      { code: 'en', file: 'en.ts' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },

  //image: {},

  imports: {
    dirs: ['composables/**', 'stores/**', 'components/**', 'pages/**'],
    //autoImport: true,
    presets: [
      {
        from: '@directus/sdk',
        imports: [
          'readAssetRaw',
          'readFile',
          'readFiles',
          'readFolders',
          'readMe',
        ],
      },
      { from: 'radix-vue', imports: ['FlattenedItem'] },
      //{ from: 'zod', imports: ['ZodType', 'ZodTypeDef'] },
    ],
  },

  modules: [
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'floating-vue/nuxt',
    'nuxt-security',
    'nuxt-snackbar',
    'pinia-plugin-persistedstate/nuxt',
    'radix-vue/nuxt',
  ],

  /* pinia: {
    storesDirs: ['stores/**'],
  },
 */
  /*  router: {
    middleware: ['auth'],
  }, */

  runtimeConfig: {
    nitro: {},
    app: {},
    public: {
      directus: {
        url: process.env.DIRECTUS_URL ?? 'http://0.0.0.0:8055',
        access_token_cookie_name: 'access_token',
        refresh_token_cookie_name: 'refresh_token',
      },
    },
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'script-src': [
          // The nonce allows the root script
          "'nonce-{{nonce}}'",
          // All scripts inserted by the root script will also be allowed
          "'strict-dynamic'",
        ],
        'upgrade-insecure-requests': false, // only in development necessary
      },
      strictTransportSecurity: false,
    },
  },

  ssr: false,
  // Enables the development server to be discoverable by other devices for mobile development
  devServer: {
    host: process.env.TAURI_DEV_HOST || 'localhost',
    port: Number.parseInt(process.env.PORT ?? '3333'),
  },

  nitro: {
    /* compressPublicAssets: true,
    minify: true, */
  },

  vite: {
    // Better support for Tauri CLI output
    clearScreen: false,
    // Enable environment variables
    // Additional environment variables can be found at
    // https://v2.tauri.app/reference/environment-variables/
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      // Tauri requires a consistent port
      strictPort: true,

      hmr: {
        // Use websocket for mobile hot reloading
        protocol: 'ws',
        // Make sure it's available on the network
        host: '0.0.0.0',
        // Use a specific port for hmr
        port: Number.parseInt(process.env.PORT ?? '3333'),
      },
    },
  },

  snackbar: {
    top: true,
    right: true,
    duration: 5000,
  },
});
