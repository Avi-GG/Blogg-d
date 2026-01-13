import Link from "next/link";
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
		<article className="min-h-screen py-12 px-4">
			<div className="max-w-4xl mx-auto">
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
					<span className="text-blue-400 text-sm font-medium">
						📖 Full post
					</span>
				</div>

				<h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
					{blog.title}
				</h1>

				<div className="flex flex-col sm:flex-row sm:items-center gap-2 text-white/60 text-sm mb-8">
					<span className="font-medium text-white/80">
						By {blog.user?.email ?? "Unknown"}
					</span>
					<span className="hidden sm:inline">•</span>
					<time dateTime={blog.createdAt.toISOString()}>
						{blog.createdAt.toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
				</div>

				<div className="h-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 mb-12" />

				<div className="prose prose-invert max-w-none">
					<div className="text-lg leading-relaxed text-white/90 whitespace-pre-wrap">
						{blog.content}
					</div>
				</div>

				<div className="mt-16 pt-12 border-t border-white/10">
					<Link href="/" className="btn-secondary inline-block">
						← Back to all blogs
					</Link>
				</div>
			</div>
		</article>
	);
}
