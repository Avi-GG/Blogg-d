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
		<article className="card" style={{ maxWidth: 900, margin: "22px auto" }}>
			<div className="pill">📖 Full post</div>
			<h1 className="title" style={{ marginTop: 10 }}>
				{blog.title}
			</h1>
			<div className="meta" style={{ marginTop: 10 }}>
				<span>By {blog.user?.email ?? "Unknown"}</span>
				<span> • </span>
				<time dateTime={blog.createdAt.toISOString()}>
					{blog.createdAt.toLocaleString()}
				</time>
			</div>
			<div className="divider" />
			<div style={{ whiteSpace: "pre-wrap", lineHeight: 1.75, fontSize: 16 }}>
				{blog.content}
			</div>
		</article>
	);
}
