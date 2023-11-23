import { cn } from "@/lib/utils";
import SigninForm from "./SigninForm";
import Link from "next/link";
import { GoogleSigninButton } from "@/components/ui/button";

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
              Sign in
            </h1>
            <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
              Don&apos;t have an account yet?{" "}
              <Link
                className="link"
                href="/signup"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <GoogleSigninButton />

            <div className="py-3 flex items-center text-xs text-secondary-400 uppercase before:flex-[1_1_0%] before:border-t before:border-secondary-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-secondary-200 after:ms-6 dark:text-secondary-500 dark:before:border-secondary-600 dark:after:border-secondary-600">
              Or
            </div>
            <div>
              <SigninForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
