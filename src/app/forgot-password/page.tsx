import { cn } from "@/lib/utils";
import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function Page() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <div
        className={cn(
          "bg-white border border-secondary-200 rounded-xl shadow-sm dark:bg-secondary-800 dark:border-secondary-700",
          "w-full max-w-md"
        )}
      >
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-secondary-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
              Remember your password?{" "}
              <Link className="link" href="/signin">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </main>
  );
}
