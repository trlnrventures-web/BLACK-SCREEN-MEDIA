"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, verifyPassword, createSession, destroySession } from "@/lib/cms/auth";
import {
  readCaseStudies,
  writeCaseStudies,
  readInsights,
  writeInsights,
} from "@/lib/cms/store";
import type { CaseStudy } from "@/lib/case-studies";
import type { InsightPost } from "@/lib/insights";

type ActionState = { error?: string } | undefined;

function revalidateAll(): void {
  revalidatePath("/", "layout");
}

export async function login(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  if (!(await verifyPassword(password))) {
    return { error: "Incorrect password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

export async function deleteCaseStudy(slug: string): Promise<void> {
  await requireAdmin();
  const studies = await readCaseStudies<CaseStudy>();
  await writeCaseStudies(studies.filter((s) => s.slug !== slug));
  revalidateAll();
}

export async function deletePost(slug: string): Promise<void> {
  await requireAdmin();
  const posts = await readInsights<InsightPost>();
  await writeInsights(posts.filter((p) => p.slug !== slug));
  revalidateAll();
}

function validateStudy(study: CaseStudy): string | null {
  if (!study.slug?.trim()) return "Slug is required.";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(study.slug)) {
    return "Slug must be lowercase letters, numbers, and hyphens.";
  }
  if (!study.client?.trim()) return "Client is required.";
  if (!study.industry?.trim()) return "Industry is required.";
  if (!study.year?.trim()) return "Year is required.";
  if (!study.summary?.trim()) return "Summary is required.";
  if (!study.cover?.trim()) return "Cover gradient is required.";
  if (!study.challenge?.trim()) return "Challenge is required.";
  if (!Array.isArray(study.services) || study.services.length === 0) {
    return "Pick at least one service.";
  }
  return null;
}

export async function saveCaseStudy(
  _prev: ActionState,
  study: CaseStudy,
  originalSlug?: string,
): Promise<ActionState & { slug?: string }> {
  await requireAdmin();
  const error = validateStudy(study);
  if (error) return { error };

  const studies = await readCaseStudies<CaseStudy>();
  const key = originalSlug ?? study.slug;
  const index = studies.findIndex((s) => s.slug === key);

  if (index === -1) {
    studies.push(study);
  } else {
    studies[index] = study;
  }

  await writeCaseStudies(studies);
  revalidateAll();
  return { slug: study.slug };
}

function validatePost(post: InsightPost): string | null {
  if (!post.slug?.trim()) return "Slug is required.";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(post.slug)) {
    return "Slug must be lowercase letters, numbers, and hyphens.";
  }
  if (!post.title?.trim()) return "Title is required.";
  if (!post.category?.trim()) return "Category is required.";
  if (!post.date?.trim()) return "Date is required.";
  if (!post.readTime?.trim()) return "Read time is required.";
  if (!post.excerpt?.trim()) return "Excerpt is required.";
  if (!post.cover?.trim()) return "Cover gradient is required.";
  if (!post.author?.name?.trim()) return "Author name is required.";
  if (!post.author?.role?.trim()) return "Author role is required.";
  if (!Array.isArray(post.body) || post.body.length === 0) {
    return "Add at least one body block.";
  }
  return null;
}

export async function savePost(
  _prev: ActionState,
  post: InsightPost,
  originalSlug?: string,
): Promise<ActionState & { slug?: string }> {
  await requireAdmin();
  const error = validatePost(post);
  if (error) return { error };

  const posts = await readInsights<InsightPost>();
  const key = originalSlug ?? post.slug;
  const index = posts.findIndex((p) => p.slug === key);

  if (index === -1) {
    posts.push(post);
  } else {
    posts[index] = post;
  }

  await writeInsights(posts);
  revalidateAll();
  return { slug: post.slug };
}
