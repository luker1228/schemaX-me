export function withBasePath(path = "") {
  if (!path || path.startsWith("#") || /^[a-z]+:/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${path.replace(/^\//, "")}`;
}

export function getHowtoManualPath(manual, path = "") {
  const normalizedPath = path.replace(/^\//, "");
  if (!normalizedPath || normalizedPath === "index.html") {
    return `howto/${manual}/`;
  }
  if (normalizedPath.endsWith(".html")) {
    return `howto/${manual}/${normalizedPath.slice(0, -5)}/`;
  }
  return `howto/${manual}/${normalizedPath}`;
}

export function withHowtoManualPath(manual, path = "") {
  return withBasePath(getHowtoManualPath(manual, path));
}
