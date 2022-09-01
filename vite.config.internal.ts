// vite.config.ts
import vue from '@vitejs/plugin-vue';
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(
  )], // to process SFC
  build: {
    outDir: 'dist/internal',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/internal/index.ts"),
      name: "discue/ui-components/internal",
      fileName: (format) => `internal.${format}.js`,
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