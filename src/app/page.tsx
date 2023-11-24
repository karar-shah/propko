import { LogoutButton } from "@/components/ui/button";
import { getServerAuth } from "@/server/lib/auth";

export default async function Page() {
  const session = await getServerAuth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center text-black dark:text-white">
        <h1>Logged in as:</h1>
        <p>{session?.user.email}</p>
        <br />
        <LogoutButton />
      </div>
    </main>
  );
}
