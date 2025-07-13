import clientPromise from "@/lib/mongodb";

function generateRandomAlias(length = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(request) {
    try {
        const body = await request.json();
        const originalUrl = body.url;
        let shorturl = body.shorturl;

        if (!originalUrl) {
            return new Response(JSON.stringify({
                success: false,
                message: "Missing 'url'"
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const client = await clientPromise;
        const db = client.db("shortener");
        const collection = db.collection("url");

        if (!shorturl) {
            let isUnique = false;
            while (!isUnique) {
                shorturl = generateRandomAlias();
                const exists = await collection.findOne({ shorturl });
                if (!exists) isUnique = true;
            }
        } else {
            const existing = await collection.findOne({ shorturl });
            if (existing) {
                return new Response(JSON.stringify({
                    success: false,
                    message: "Short URL already exists"
                }), {
                    status: 409,
                    headers: { "Content-Type": "application/json" }
                });
            }
        }

        await collection.insertOne({
            url: originalUrl,
            shorturl,
            createdAt: new Date()
        });

        const shortenedUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/${shorturl}`;

        return new Response(JSON.stringify({
            success: true,
            message: "Short URL saved successfully",
            shorturl,
            shortenedUrl
        }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("❌ API Error:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Invalid JSON or server error"
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
