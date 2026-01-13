import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function BlogPage({ params }) {
	const { id } = await params;
	const blogId = Number(id);

	if (!Number.isFinite(blogId)) {
		notFound();
	}

	const blog = await prisma.blog.findUnique({
		where: { id: blogId },
		select: {
			id: true,
			title: true,
			content: true,
			excerpt: true,
			createdAt: true,
			user: { select: { email: true } },
		},
	});

	if (!blog) {
		notFound();
	}

	return (
		<article style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
			<h1 style={{ fontSize: 40, lineHeight: 1.1, marginBottom: 10 }}>
				{blog.title}
			</h1>
			<div style={{ opacity: 0.7, marginBottom: 20 }}>
				<span>By {blog.user?.email ?? "Unknown"}</span>
				<span style={{ margin: "0 8px" }}>•</span>
				<time dateTime={blog.createdAt.toISOString()}>
					{blog.createdAt.toLocaleString()}
				</time>
			</div>

			<div style={{ whiteSpace: "pre-wrap", fontSize: 16, lineHeight: 1.6 }}>
				{blog.content}
			</div>
		</article>
	);
}
