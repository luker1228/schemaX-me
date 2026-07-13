import React, { useEffect } from "react";

function rewriteHtmlForBase(html) {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  return html
    .replace(/href="\/(?!\/)/g, `href="${baseUrl}`)
    .replace(/src="\/(?!\/)/g, `src="${baseUrl}`);
}

export function DeployLegacyPage({ title, html }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <div dangerouslySetInnerHTML={{ __html: rewriteHtmlForBase(html) }} />;
}
