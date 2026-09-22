import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { requireAdmin } from "@/lib/cms/auth";
import { readCaseStudies } from "@/lib/cms/store";
import { readInsights } from "@/lib/cms/store";
import { logout } from "@/app/admin/actions";
import type { CaseStudy } from "@/lib/case-studies";
import type { InsightPost } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  await requireAdmin();

  const studies = await readCaseStudies<CaseStudy>();
  const posts = await readInsights<InsightPost>();

  return (
    <div className="flex-1 py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading as="h1" size="lg">
              Dashboard
            </Heading>
            <p className="mt-3 text-sm text-gray-100">
              {studies.length} case studies · {posts.length} posts
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/case-studies/new"
              className="inline-flex items-center gap-3 rounded-full border border-gray-500 px-5 py-3 text-xs uppercase tracking-[0.25em] text-gray-100 transition-colors hover:border-accent hover:text-accent"
            >
              + New case study
            </Link>
            <Link
              href="/admin/insights/new"
              className="inline-flex items-center gap-3 rounded-full border border-gray-500 px-5 py-3 text-xs uppercase tracking-[0.25em] text-gray-100 transition-colors hover:border-accent hover:text-accent"
            >
              + New post
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="cursor-pointer rounded-full border border-gray-500 px-5 py-3 text-xs uppercase tracking-[0.25em] text-gray-300 transition-colors hover:border-accent hover:text-accent"
              >
                Log out
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="font-heading text-xl font-bold">Case studies</h2>
            <ul className="mt-6 divide-y divide-gray-500 border-y border-gray-500">
              {studies.map((study) => (
                <li
                  key={study.slug}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{study.client}</p>
                    <p className="mt-1 truncate text-xs text-gray-300">
                      {study.industry} · {study.year}
                      {study.featured ? " · featured" : ""}
                    </p>
                  </div>
                  <Link
                    href={`/admin/case-studies/${study.slug}`}
                    className="shrink-0 rounded-full border border-gray-500 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-100 transition-colors hover:border-accent hover:text-accent"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold">Insights posts</h2>
            <ul className="mt-6 divide-y divide-gray-500 border-y border-gray-500">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{post.title}</p>
                    <p className="mt-1 truncate text-xs text-gray-300">
                      {post.category} · {post.date}
                    </p>
                  </div>
                  <Link
                    href={`/admin/insights/${post.slug}`}
                    className="shrink-0 rounded-full border border-gray-500 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-100 transition-colors hover:border-accent hover:text-accent"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </div>
  );
}
