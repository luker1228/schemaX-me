import React, { useEffect, useRef } from "react";
import { initLegacyEnhancements } from "./legacy-enhancements.js";

function rewriteLegacyHtmlForBase(html) {
  return html
    .replace(/href="\/(?!\/)/g, 'href="./')
    .replace(/src="\/(?!\/)/g, 'src="./')
    .replace(/"href":"\/(?!\/)/g, '"href":"./');
}

export function LegacyPage({ title, html }) {
  const rootRef = useRef(null);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!rootRef.current) return undefined;
    return initLegacyEnhancements(rootRef.current);
  }, [html]);

  return <div ref={rootRef} dangerouslySetInnerHTML={{ __html: rewriteLegacyHtmlForBase(html) }} />;
}
