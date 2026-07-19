export const deployManual = {
  code: "FM-02",
  slug: "deploy",
  title: "部署课程",
  description: "把应用安全地推上线：环境变量、CI/CD、容器、域名与运维排错。",
  heroTitle: ["从产物到上线", "部署课程"],
  heroSummary:
    "给已经能写应用、但还没把部署链路真正打通的同学。先把 Docker、镜像、配置注入和运行环境讲清楚，再往 CI/CD 和线上排障推进。",
  heroTags: ["构建与产物", "镜像与运行时", "环境变量", "配置注入", "容器化上线", "部署排错"],
  faq: [
    {
      title: "为什么部署第一课不是直接讲 Kubernetes？",
      copy: "因为真正的分界线在于你有没有把产物、镜像、配置和运行环境分清楚。容器基础没立住，K8s 只会变成名词堆叠。",
      open: true,
    },
    {
      title: "前端项目也需要先学镜像吗？",
      copy: "需要。即使最终是静态站点，构建阶段和运行阶段依然是两套职责，镜像只是把这个边界显式化。",
    },
    {
      title: "这份手册会覆盖什么？",
      copy: "从 Docker 镜像、配置注入、CI/CD 到上线后的排错路径。先把单机部署打通，再谈更复杂的编排。",
    },
  ],
};

export const deployLessons = [
  {
    id: "DEP-01",
    slug: "docker-artifact-image",
    title: "从编译产物到镜像",
    label: "Docker · 01",
    summary: "先把编译产物和运行环境分开，再理解为什么多阶段构建是部署里的默认动作。",
    tags: "Dockerfile · 多阶段构建 · 运行时配置",
    heroMeta: {
      eyebrow: "Dockerfile · IMAGE",
      secondary: "DEP-01 · 镜像基础",
      readingTime: "阅读时长 ≈ 8 分钟",
      lines: ["从编译产物", "到镜像"],
      emphasis: "编译产物",
      side: [
        ["本页讲什么", "artifact → image"],
        ["内容形式", "概念拆解 + Dockerfile"],
        ["适合谁", "写应用但还没系统部署的人"],
        ["目标", "看懂多阶段构建的边界"],
      ],
    },
    toc: [
      { href: "#deploy-core", label: "核心" },
      { href: "#deploy-local-build", label: "本地构建的问题" },
      { href: "#deploy-multi-stage", label: "多阶段构建" },
      { href: "#deploy-runtime", label: "运行时差异" },
      { href: "#deploy-habits", label: "打包习惯" },
      { href: "#deploy-config", label: "配置注入" },
      { href: "#deploy-summary", label: "一句话总结" },
    ],
  },
];

export function getDeployLessonBySlug(slug) {
  return deployLessons.find((lesson) => lesson.slug === slug);
}

export function getDeployLessonIndex(slug) {
  return deployLessons.findIndex((lesson) => lesson.slug === slug);
}

export function getDeployLessonNeighbors(slug) {
  const index = getDeployLessonIndex(slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: deployLessons[index - 1] ?? null,
    next: deployLessons[index + 1] ?? null,
  };
}
