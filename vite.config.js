import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ghPages } from "vite-plugin-gh-pages";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ghPages({
      branch: "gh-pages",
      silent: false,
    }),
  ],
  base: "/task-planner",
  build: {
    rollupOptions: {
      input: "/index.html",
    },
  },
});
