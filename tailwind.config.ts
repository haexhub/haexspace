import type { Config } from 'tailwindcss';
import { iconsPlugin, dynamicIconsPlugin } from '@egoist/tailwindcss-icons';
import colors from 'tailwindcss/colors';

export default {
  content: ['./src/**/*.{js,vue,ts}'],
  darkMode: 'selector',
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all individual icon packages you have installed
      // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
      //collections: getIconCollections(["mdi", "lucide"]),
      // If you want to use all icons from @iconify/json, you can do this:
      // collections: getIconCollections("all"),
      // and the more recommended way is to use `dynamicIconsPlugin`, see below.
    }),
    dynamicIconsPlugin({
      scale: 1,
    }),
  ],

  theme: {
    extend: {
      colors: {
        'primary-active': colors.teal[600],
        'primary-focus': colors.teal[400],
        'primary-hover': colors.teal[400],
        'primary': colors.teal[500],

        'dark': {
          'primary-active': colors.teal[700],
          'primary-focus': colors.teal[600],
          'primary-hover': colors.teal[600],
          'primary': colors.teal[500],
        },
        'secondary': colors.sky[500],
      },

      fontFamily: {
        sans: [
          'Adelle',
          'Roboto Slab',
          'DejaVu Serif',
          'Georgia',
          'Graphik',
          'sans-serif',
        ],
        serif: ['Merriweather', 'serif'],
      },

      screens: {
        xs: '360px',
      },

      transitionProperty: {
        height: 'height',
      },
    },
  },
} satisfies Config;
