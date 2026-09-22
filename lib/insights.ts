import { readInsights } from "@/lib/cms/store";

export type PostAuthor = {
  name: string;
  role: string;
  initials: string;
};

export type PostBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type InsightPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  cover: string;
  author: PostAuthor;
  body: PostBlock[];
};

export async function getAllPosts(): Promise<InsightPost[]> {
  return readInsights<InsightPost>();
}

export async function getPost(
  slug: string,
): Promise<InsightPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getPostCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.map((post) => post.category))).sort();
}

export async function getRelatedPosts(
  current: InsightPost,
  limit = 3,
): Promise<InsightPost[]> {
  const posts = await getAllPosts();
  const sameCategory = posts.filter(
    (post) => post.slug !== current.slug && post.category === current.category,
  );
  const others = posts.filter(
    (post) => post.slug !== current.slug && post.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}