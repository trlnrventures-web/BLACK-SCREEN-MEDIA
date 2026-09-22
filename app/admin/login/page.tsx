import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { LoginForm } from "@/components/admin/login-form";
import { isAdmin } from "@/lib/cms/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <Container width="sm">
        <Heading as="h1" size="lg" className="text-center">
          Admin
        </Heading>
        <p className="mt-4 text-center text-sm text-gray-100">
          Sign in to manage case studies and insights.
        </p>
        <div className="mt-10">
          <LoginForm />
        </div>
      </Container>
    </div>
  );
}
