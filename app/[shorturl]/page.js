
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
  const { shorturl } = params;

  const client = await clientPromise;
  const db = client.db("shortener");
  const collection = db.collection("url");

  const found = await collection.findOne({ shorturl });

  if (found?.url) {
    redirect(found.url);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">The link you requested was not found.</p>
    </div>
  );
}
