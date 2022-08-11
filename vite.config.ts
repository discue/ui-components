// vite.config.ts
const path = require("path");
const { defineConfig } = require("vite");
import vue from '@vitejs/plugin-vue';

module.exports = defineConfig({
  plugins: [vue()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "discue/ui-components",
      fileName: (format) => `ui.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "vue-router"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});