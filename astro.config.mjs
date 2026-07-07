import { defineConfig } from "astro/config";

export default defineConfig(({ mode }) => ({
  site: "https://luker1228.github.io",
  base: mode === "development" ? "/" : "/aritcles-hub",
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  }
}));
