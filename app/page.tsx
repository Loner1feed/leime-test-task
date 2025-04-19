import { MemeList } from "@/components/meme-list";

// List view page
export default function Home() {
  return (
    <>
      <h1 className="lg:text-4xl md:text-2xl text-center mb-6">
        List view of meme data
      </h1>
      <MemeList />
    </>
  );
}
