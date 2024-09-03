import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl(), sentryVitePlugin({
    org: "payfaction",
    project: "farmlove"
  })],
  build: {
    outDir: "./docs",
    sourcemap: true
  },
  base: "./",
});