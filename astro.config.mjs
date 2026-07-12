import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  site: "https://luker1228.github.io",
  base: mode === "development" ? "/" : "/aritcles-hub",
  output: "static",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  }
}));
