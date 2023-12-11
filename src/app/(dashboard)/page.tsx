import ListingTable from "@/components/table/listings";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  return (
    <main className="p-10">
      <div className="flex-1 w-full col-span-8 lg:col-span-9 2xl:col-span-10">
        <ListingTable />
      </div>
    </main>
  );
}
