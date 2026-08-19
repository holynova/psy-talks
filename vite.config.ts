import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
  base: process.env.GITHUB_PAGES === "1" ? "/psy-talks/" : "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        v2: "v2/index.html",
      },
    },
  },
  server: {
    host: "127.0.0.1",
  },
});
