import { cjsInterop } from "vite-plugin-cjs-interop";
import { defineConfig } from "vite";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { vitePlugin as remix } from "@remix-run/dev";
import { vercelPreset } from "@vercel/remix/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  ssr: {
    noExternal: process.env.NODE_ENV === "production" ? ["@mui/**"] : [],
  },
  plugins: [
    viteCommonjs(),
    tsconfigPaths({ loose: true }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      ignoredRouteFiles: ["**/.*"],
      presets: [vercelPreset()],
      serverModuleFormat: "esm",
    }),
    cjsInterop({
      dependencies:
        process.env.NODE_ENV === "production" ? [] : ["@mui/material/**"],
    }),
  ],
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "./app") }],
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
});
