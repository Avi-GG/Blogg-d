import { prisma } from "@/lib/prisma";

export async function GET() {
	const blogs = await prisma.blog.findMany({
		orderBy: { createdAt: "desc" },
	});

	return Response.json(blogs);
}

export async function POST(req) {
	const body = await req.json();

	const blog = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			excerpt: body.content.slice(0, 40) + "...",
		},
	});

	return Response.json(blog);
}
