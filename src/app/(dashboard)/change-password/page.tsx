import { cn } from "@/lib/utils";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function Page() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center px-5">
      <div
        className={cn(
          "bg-white border border-secondary-200 rounded-xl shadow-sm dark:bg-secondary-800 dark:border-secondary-700",
          "w-full max-w-md"
        )}
      >
        <ChangePasswordForm />
      </div>
    </main>
  );
}
