import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Object form (not function form): in astro 5.18 a function-form config does
// not register integration renderers, so @astrojs/react would not handle .jsx.
// Detect dev vs build via NODE_ENV to preserve the dev "/" / prod "/aritcles-hub" split.
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  site: "https://luker1228.github.io",
  base: isDev ? "/" : "/aritcles-hub",
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
});
