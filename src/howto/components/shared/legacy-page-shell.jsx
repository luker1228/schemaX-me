import React, { useEffect, useRef } from "react";
import { initLegacyEnhancements } from "../frontend/legacy-enhancements.js";
import { PageFrame } from "../frontend/site-components.jsx";

function stripEmbeddedHeader(html) {
  return html.replace(/^\s*<header class="site-header"[\s\S]*?<\/header>\s*/i, "");
}

export function LegacyPageShell({ title, html, renderHeader = null, renderFooter = null, rewriteHtml = null, enhance = true }) {
  const rootRef = useRef(null);
  const renderedHtml = stripEmbeddedHeader(rewriteHtml ? rewriteHtml(html) : html);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!enhance || !rootRef.current) return undefined;
    return initLegacyEnhancements(rootRef.current);
  }, [enhance, renderedHtml]);

  return (
    <PageFrame title={title}>
      <>
        {renderHeader ? renderHeader() : null}
        <div ref={rootRef} dangerouslySetInnerHTML={{ __html: renderedHtml }} />
        {renderFooter ? renderFooter() : null}
      </>
    </PageFrame>
  );
}
