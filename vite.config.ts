import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [
    viteCommonjs({
      include: ["@mui/system/**", "@mui/material/**", "@mui/icons-material/**"],
    }),
    tsconfigPaths({ loose: true }),
    remix({
      ignoredRouteFiles: ["**/.*"],
      serverModuleFormat: "esm",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    cjsInterop({
      dependencies: ["@mui/material/**"],
    }),
  ],
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "./app") }],
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
});
