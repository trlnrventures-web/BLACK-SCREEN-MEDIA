import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import seedCaseStudies from "@/content/case-studies.json";
import seedInsights from "@/content/insights.json";

type KvBinding = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

const contentDir = path.join(process.cwd(), "content");

const kvKeyByFile: Record<string, string> = {
  "case-studies.json": "case-studies",
  "insights.json": "insights",
};

const seeds: Record<string, unknown[]> = {
  "case-studies.json": seedCaseStudies as unknown[],
  "insights.json": seedInsights as unknown[],
};

function getKv(): KvBinding | undefined {
  try {
    const { env } = getCloudflareContext();
    return (env as unknown as Record<string, unknown>).BSM_KV as
      | KvBinding
      | undefined;
  } catch {
    // Not running inside a Cloudflare Worker (next build / local dev) —
    // fall back to the bundled seed data or the local content directory.
    return undefined;
  }
}

async function readJson<T>(fileName: string): Promise<T[]> {
  const kv = getKv();
  if (kv) {
    const cacheKey = kvKeyByFile[fileName];
    const raw = await kv.get(cacheKey);
    if (raw != null) return JSON.parse(raw) as T[];
    const seed = seeds[fileName] as T[];
    await kv.put(cacheKey, JSON.stringify(seed));
    return seed;
  }

  const filePath = path.join(contentDir, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T[];
}

async function writeJson<T>(fileName: string, data: T[]): Promise<void> {
  const kv = getKv();
  if (kv) {
    const cacheKey = kvKeyByFile[fileName];
    await kv.put(cacheKey, JSON.stringify(data));
    return;
  }

  const filePath = path.join(contentDir, fileName);
  const tmpPath = `${filePath}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2) + "\n", "utf8");
  await fs.rename(tmpPath, filePath);
}

export async function readCaseStudies<T>(): Promise<T[]> {
  return readJson<T>("case-studies.json");
}

export async function writeCaseStudies<T>(data: T[]): Promise<void> {
  await writeJson("case-studies.json", data);
}

export async function readInsights<T>(): Promise<T[]> {
  return readJson<T>("insights.json");
}

export async function writeInsights<T>(data: T[]): Promise<void> {
  await writeJson("insights.json", data);
}