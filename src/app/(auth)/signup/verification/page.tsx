import { cn } from "@/lib/utils";
import Link from "next/link";
import { getServerAuth } from "@/server/lib/auth";
import { RedirectType, redirect } from "next/navigation";
import { db } from "@/server/lib/db";
import ResendEmailButton from "./ResendEmail";
import { CheckCircledIcon, InfoCircledIcon } from "@radix-ui/react-icons";

export default async function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const session = await getServerAuth();
  if (session?.user && session.user.emailVerified) {
    return redirect("/", RedirectType.replace);
  }
  if (!searchParams.token) return redirect("/signup", RedirectType.replace);
  const user = await db.User.getUserById(searchParams.token);
  if (!user) return redirect("/signup", RedirectType.replace);

  return (
    <main className="w-full min-h-screen flex items-center justify-center px-5">
      <div
        className={cn(
          "bg-white border border-secondary-200 rounded-xl shadow-sm dark:bg-secondary-800 dark:border-secondary-700",
          "w-full max-w-md"
        )}
      >
        <div className="p-4 sm:p-7">
          <div className="text-center flex flex-col items-center">
            {user.emailVerified ? (
              <CheckCircledIcon className="w-10 h-10 text-green-500" />
            ) : (
              <InfoCircledIcon className="w-10 h-10 text-yellow-500" />
            )}
            <h1 className="block text-2xl font-bold text-secondary-800 dark:text-white mt-5">
              {user.emailVerified
                ? "Verification Completed!"
                : "Verification Required!"}
            </h1>
            {!user.emailVerified && (
              <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
                A verification email is sent to your email (
                <span className="text-primary">{user.email}</span>).
              </p>
            )}
            {user.emailVerified ? (
              <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
                Your email address verified successfully.{" "}
                <Link href="/signin" className="link">
                  Signin here
                </Link>
              </p>
            ) : (
              <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
                Didn&apos;t receive email? <ResendEmailButton user={user} />
                <br />
                <br />
                <Link href={"/signup"} className="link" replace>
                  Signup with other email.
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// function TokenExpiredView({ user }: { user: IUser }) {
//   return (
//     <div className="text-center flex flex-col items-center">
//       <InfoCircledIcon className="w-10 h-10 text-red-500" />

//       <h1 className="block text-2xl font-bold text-secondary-800 dark:text-white mt-5">
//         Token Expired!
//       </h1>

//       <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
//         It looks like your verification token expired, <br /> but you can
//         regenerate. {" "}
//         <RegenerateBtn user={user} />
//       </p>
//     </div>
//   );
// }
