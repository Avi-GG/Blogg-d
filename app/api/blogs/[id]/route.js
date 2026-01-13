import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
	const { id } = await params;
	const blog = await prisma.blog.findUnique({
		where: { id: Number(id) },
	});

	return Response.json(blog);
}

export async function PUT(req, { params }) {
	const { id } = await params;
	const body = await req.json();

	await prisma.blog.update({
		where: { id: Number(id) },
		data: {
			title: body.title,
			content: body.content,
			excerpt: body.content.slice(0, 40) + "...",
		},
	});

	return Response.json({ success: true });
}

export async function DELETE(req, { params }) {
	const { id } = await params;
	await prisma.blog.delete({
		where: { id: Number(id) },
	});

	return Response.json({ success: true });
}
