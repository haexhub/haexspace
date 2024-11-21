
// @ts-nocheck
import locale__home_haex_Projekte_haexcloud_haexspace_src_i18n_de_ts from "../src/i18n/de.ts?hash=b2e00e58&locale=de";
import locale__home_haex_Projekte_haexcloud_haexspace_src_i18n_en_ts from "../src/i18n/en.ts?hash=0f8ea1b9&locale=en";


export const localeCodes =  [
  "de",
  "en"
]

export const localeLoaders = {
  "de": [{ key: "../src/i18n/de.ts", load: () => Promise.resolve(locale__home_haex_Projekte_haexcloud_haexspace_src_i18n_de_ts), cache: false }],
  "en": [{ key: "../src/i18n/en.ts", load: () => Promise.resolve(locale__home_haex_Projekte_haexcloud_haexspace_src_i18n_en_ts), cache: false }]
}

export const vueI18nConfigs = [
  
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [
    {
      "code": "de",
      "files": [
        "/home/haex/Projekte/haexcloud/haexspace/src/i18n/de.ts"
      ]
    },
    {
      "code": "en",
      "files": [
        "/home/haex/Projekte/haexcloud/haexspace/src/i18n/en.ts"
      ]
    }
  ],
  "defaultLocale": "de",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix_and_default",
  "lazy": false,
  "langDir": "i18n",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "multiDomainLocales": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "de",
    "files": [
      {
        "path": "/home/haex/Projekte/haexcloud/haexspace/src/i18n/de.ts"
      }
    ]
  },
  {
    "code": "en",
    "files": [
      {
        "path": "/home/haex/Projekte/haexcloud/haexspace/src/i18n/en.ts"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
