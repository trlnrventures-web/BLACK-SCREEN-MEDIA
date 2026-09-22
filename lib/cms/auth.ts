import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "bsm_admin_session";

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || "black-screen-admin";
}

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || getPassword();
}

export async function verifyPassword(input: string): Promise<boolean> {
  const expected = getPassword();
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export async function createSession(): Promise<void> {
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const payload = String(expires);
  const token = `${payload}.${sign(payload)}`;
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && expires > Date.now();
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
