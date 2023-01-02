const colors = require('tailwindcss/colors')

colors.primary = colors.lime
colors.secondary = colors.pink
colors.tertiary = colors.indigo

module.exports = {
  content: [
    "./docs/**/*.{vue,js,ts,jsx,tsx,scss,md}",
    "./docs/.vuepress/examples/*.{vue,js,ts,jsx,tsx,scss,md}",
    "./docs/.vuepress/theme/components/*.{vue,js,ts,jsx,tsx,scss,md}",
    "./src/**/*.{ts,js,vue}"
  ],
  theme: {
    extend: {
      colors: {
        attention: colors.rose,
        primary: colors.primary,
        secondary: colors.secondary,
        tertiary: colors.tertiary,
      },
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}