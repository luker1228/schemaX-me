import React from "react";
import html from "./legacy-content/docker-artifact-image.html?raw";
import { DeployLegacyPage } from "./deploy-legacy-page.jsx";

export function DeployDockerArtifactImagePage() {
  return <DeployLegacyPage title="从编译产物到镜像 · 部署战术手册" html={html} />;
}
