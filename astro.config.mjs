import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://luker1228.github.io",
  base: "/aritcles-hub",
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
