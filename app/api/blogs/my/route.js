import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
	console.log("=== /api/blogs/my GET called ===");
	const cookieStore = await cookies();
	const userId = cookieStore.get("userId");
	console.log("userId cookie:", userId);

	if (!userId) {
		console.log("No userId cookie found, returning 401");
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const blogs = await prisma.blog.findMany({
			where: {
				userId: parseInt(userId.value),
			},
			orderBy: { createdAt: "desc" },
		});
		console.log("Found blogs:", blogs.length);
		return Response.json(blogs);
	} catch (error) {
		console.error("Error in /api/blogs/my:", error);
		return Response.json({ error: error.message }, { status: 500 });
	}
}
