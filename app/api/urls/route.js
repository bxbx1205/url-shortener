import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("shortener");
        const urls = await db.collection("url").find().sort({ createdAt: -1 }).toArray();

        return Response.json({ success: true, urls });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
