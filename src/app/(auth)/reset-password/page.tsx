import { cn } from "@/lib/utils";
import ResetPasswordForm from "./ResetPasswordForm";
import NewPasswordForm from "./NewPasswordForm";
import { getServerAuth } from "@/server/lib/auth";
import { RedirectType, redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const session = await getServerAuth();
  if (session?.user) return redirect("/", RedirectType.replace);
  return (
    <main className="w-full min-h-screen flex items-center justify-center px-5">
      <div
        className={cn(
          "bg-white border border-secondary-200 rounded-xl shadow-sm dark:bg-secondary-800 dark:border-secondary-700",
          "w-full max-w-md"
        )}
      >
        {searchParams.token ? (
          <NewPasswordForm token={searchParams.token} />
        ) : (
          <ResetPasswordForm />
        )}
      </div>
    </main>
  );
}
