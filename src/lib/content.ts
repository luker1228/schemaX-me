import { getCollection, type CollectionEntry } from "astro:content";

export const CATEGORIES = ["ai", "cs", "life", "english"] as const;
export type Category = (typeof CATEGORIES)[number];

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

const CATEGORY_LABELS: Record<Category, string> = {
  ai: "AI",
  cs: "CS",
  life: "Life",
  english: "English"
};

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  ai: "Agent、LLM、工具与实践复盘。",
  cs: "工程最佳实践与通用计算机知识。",
  life: "代码之外的思考、写作与方法论。",
  english: "英语学习、表达积累与写作训练。"
};

function titleFromId(id: string) {
  const raw = id.split("/").pop() ?? id;
  return raw.replace(/\.md$/, "");
}

function inferCategory(entry: CollectionEntry<"posts">): Category {
  if (entry.data.category) {
    return entry.data.category;
  }

  const [topLevel] = entry.id.split("/");
  if (CATEGORIES.includes(topLevel as Category)) {
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
