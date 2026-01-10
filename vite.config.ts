import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // ⚠️ Vue must be placed after VueRouter()
    VueRouter({}),
    vue(),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
      ],
      imports: [
        "vue",
        VueRouterAutoImports,
        {
          pinia: ["defineStore", "storeToRefs", "acceptHMRUpdate"],
        },
      ],
      // dts: "./auto-imports.d.ts",
      dts: true,
      viteOptimizeDeps: true,
      dirs: ["src/stores", "src/stores/ui"],
    }),
    Components({}),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["ai-logo.png"],
      manifest: {
        name: "abcd",
        short_name: "abcd",
        display: "standalone",
        icons: [{ src: "./ai-logo.png", sizes: "any", type: "image/png" }],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
