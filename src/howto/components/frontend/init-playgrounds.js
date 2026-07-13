export function initPlaygrounds(root = document) {
  const cleanups = [];

  root.querySelectorAll("[data-playground]").forEach((playgroundRoot) => {
    const source = playgroundRoot.querySelector("[data-playground-source]");
    const preview = playgroundRoot.querySelector("[data-playground-preview]");
    const resetBtn = playgroundRoot.querySelector("[data-playground-reset]");
    const cssTemplate = playgroundRoot.querySelector("[data-playground-css]");
    const jsTemplate = playgroundRoot.querySelector("[data-playground-js]");
    const htmlTemplate = playgroundRoot.querySelector("[data-playground-html]");
    if (!preview || !htmlTemplate || (!cssTemplate && !jsTemplate)) return;

    const sourceTemplate = cssTemplate || jsTemplate;
    const defaultSource = sourceTemplate.textContent.trim();
    const baseCss = playgroundRoot.querySelector("[data-playground-base-css]")?.textContent.trim();
    const baseBeforeCss = playgroundRoot.querySelector("[data-playground-base-before-css]")?.textContent.trim();
    const baseAfterCss = playgroundRoot.querySelector("[data-playground-base-after-css]")?.textContent.trim();
    const baseBeforeJs = playgroundRoot.querySelector("[data-playground-base-before-js]")?.textContent.trim();
    const baseAfterJs = playgroundRoot.querySelector("[data-playground-base-after-js]")?.textContent.trim();
    const html = htmlTemplate.textContent.trim();
    if (source) {
      source.value = defaultSource;
    }

    function render() {
      const currentSource = source ? source.value : defaultSource;
      const css = [baseBeforeCss || baseCss, cssTemplate ? currentSource : null, baseAfterCss].filter(Boolean).join("\n");
      const js = [baseBeforeJs, jsTemplate ? currentSource : null, baseAfterJs].filter(Boolean).join("\n");
      const doc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${css ? `<style>${css}</style>` : ""}</head><body>${html}${js ? `<script>${js}<\/script>` : ""}</body></html>`;
      preview.srcdoc = doc;
    }

    let timer;
    if (source) {
      const inputHandler = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(render, 150);
      };
      source.addEventListener("input", inputHandler);
      cleanups.push(() => source.removeEventListener("input", inputHandler));
    }

    if (resetBtn && source) {
      const resetHandler = () => {
        source.value = defaultSource;
        render();
      };
      resetBtn.addEventListener("click", resetHandler);
      cleanups.push(() => resetBtn.removeEventListener("click", resetHandler));
    }

    render();
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
