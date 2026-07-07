import { getCollection, type CollectionEntry } from "astro:content";

export const CATEGORIES = ["ai", "cs", "life", "english"] as const;
export const CONTENT_CATEGORIES = [...CATEGORIES, "modelcraft"] as const;
export type Category = (typeof CONTENT_CATEGORIES)[number];

export type NormalizedPost = {
  entry: CollectionEntry<"posts">;
  slug: string;
  title: string;
  description: string;
  category: Category;
  pubDate?: Date;
  updatedDate?: Date;
  tags: string[];
  series?: string;
  cover?: string;
};

export type TopicGroup = {
  key: string;
  label: string;
  count: number;
  href: string;
};

const CATEGORY_LABELS: Record<Category, string> = {
  ai: "AI",
  cs: "CS",
  life: "Life",
  english: "English",
  modelcraft: "ModelCraft"
};

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  ai: "Agent、LLM、工具与实践复盘。",
  cs: "工程最佳实践与通用计算机知识。",
  life: "代码之外的思考、写作与方法论。",
  english: "英语学习、表达积累与写作训练。",
  modelcraft: "一个围绕数据模型引擎、协议自解释、Schema 约束和 Runtime 设计展开的长期项目。"
};

function titleFromId(id: string) {
  const raw = id.split("/").pop() ?? id;
  return raw.replace(/\.md$/, "");
}

function inferCategory(entry: CollectionEntry<"posts">): Category {
  const [topLevel] = entry.id.split("/");
  if (CONTENT_CATEGORIES.includes(topLevel as Category)) {
    return topLevel as Category;
  }

  return "ai";
}

function normalizePost(entry: CollectionEntry<"posts">): NormalizedPost {
  return {
    entry,
    slug: entry.slug,
    title: entry.data.title ?? titleFromId(entry.id),
    description: entry.data.description ?? "",
    category: inferCategory(entry),
    pubDate: entry.data.pubDate,
    updatedDate: entry.data.updatedDate,
    tags: entry.data.tags ?? [],
    series: entry.data.series,
    cover: entry.data.cover
  };
}

function sortByDateDesc<T extends { pubDate?: Date }>(items: T[]) {
  return [...items].sort((left, right) => {
    const leftTs = left.pubDate?.getTime() ?? 0;
    const rightTs = right.pubDate?.getTime() ?? 0;
    return rightTs - leftTs;
  });
}

export async function getAllPosts() {
  const entries = await getCollection("posts");
  return sortByDateDesc(entries.map(normalizePost));
}

export async function getPostsByCategory(category: Category) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

export async function getPostsBySeries(series: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.series === series);
}

export function getPostGroup(post: NormalizedPost) {
  const parts = post.entry.id.split("/");
  return parts[1] ?? "essays";
}

export function getSeriesSlug(series: string) {
  return series
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getSeriesPath(series: string, hrefMap: Record<string, string> = {}) {
  return hrefMap[series] ?? `${import.meta.env.BASE_URL.replace(/\/?$/, "/")}blogs/series/${getSeriesSlug(series)}/`;
}

export async function getSeriesSlugMap() {
  const posts = await getAllPosts();
  return new Map(
    Array.from(new Set(posts.map((post) => post.series).filter((series): series is string => Boolean(series)))).map((series) => [
      getSeriesSlug(series),
      series
    ])
  );
}

function titleCaseSegment(segment: string) {
  return segment.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function getGroupLabel(group: string, posts: NormalizedPost[]) {
  if (group === "essays") {
    return "随笔";
  }

  const seriesNames = Array.from(new Set(posts.map((post) => post.series).filter((series): series is string => Boolean(series))));
  if (seriesNames.length === 1) {
    return seriesNames[0];
  }

  return titleCaseSegment(group);
}

export function getCategoryGroups(posts: NormalizedPost[], category: Category, basePath = import.meta.env.BASE_URL.replace(/\/?$/, "/")): TopicGroup[] {
  const grouped = posts.reduce((map, post) => {
    const group = getPostGroup(post);
    const bucket = map.get(group) ?? [];
    bucket.push(post);
    map.set(group, bucket);
    return map;
  }, new Map<string, NormalizedPost[]>());

  return Array.from(grouped.entries())
    .map(([key, groupPosts]) => ({
      key,
      label: getGroupLabel(key, groupPosts),
      count: groupPosts.length,
      href: `${basePath}${category}/${key}/`
    }))
    .sort((left, right) => {
      if (left.key === "essays") {
        return 1;
      }

      if (right.key === "essays") {
        return -1;
      }

      return left.label.localeCompare(right.label, "zh-CN");
    });
}

export function getCategoryLabel(category: Category) {
  return CATEGORY_LABELS[category];
}

export function getCategoryDescription(category: Category) {
  return CATEGORY_DESCRIPTIONS[category];
}

export function formatDate(date?: Date) {
  if (!date) {
    return "Undated";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}
