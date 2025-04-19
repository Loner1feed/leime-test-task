import { MemeTable } from "@/components/table";

// Table view page
export default function Home() {
  return (
    <>
      <h1 className="lg:text-4xl md:text-2xl text-center mb-6">
        Table view of meme data
      </h1>
      <MemeTable />
    </>
  );
}
