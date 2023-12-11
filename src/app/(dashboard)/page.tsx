import ListingTable from "@/components/table/listings";
// import { authOptions } from "@/server/lib/auth";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "pages/api/auth/[...nextauth]"

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  // const session = await getServerSession(authOptions);
  // console.log("session", session);
  return (
    <main className="p-10">
      <div className="flex-1 w-full col-span-8 lg:col-span-9 2xl:col-span-10">
        <ListingTable />
      </div>
    </main>
  );
}
