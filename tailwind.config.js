module.exports = {
  content: [
    "./docs/**/*.{vue,js,ts,jsx,tsx,scss,md}",
    "./docs/.vuepress/theme/components/*.{vue,js,ts,jsx,tsx,scss,md}",
    "./src/**"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
