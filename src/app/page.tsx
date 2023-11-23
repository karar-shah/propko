import { getServerAuth } from "@/server/lib/auth";
import Image from "next/image";

export default async function Page() {
  const session = await getServerAuth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>{session?.user.name}</h1>
      <p>{session?.user.email}</p>
    </main>
  );
}
