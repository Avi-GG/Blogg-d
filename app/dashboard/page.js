import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function deleteBlog(blogId) {
	"use server";

	const cookieStore = await cookies();
	const userId = cookieStore.get("userId");
	if (!userId) {
		redirect("/login");
	}

	const id = typeof blogId === "string" ? parseInt(blogId, 10) : blogId;
	const currentUserId = parseInt(userId.value, 10);

	const blog = await prisma.blog.findUnique({
		where: { id },
		select: { id: true, userId: true },
	});

	if (!blog || blog.userId !== currentUserId) {
		redirect("/dashboard");
	}

	await prisma.blog.delete({ where: { id } });

	revalidatePath("/");
	revalidatePath("/dashboard");
}

export default async function DashboardPage() {
	const cookieStore = await cookies();
	const userId = cookieStore.get("userId");

	let blogs = [];
	if (userId) {
		blogs = await prisma.blog.findMany({
			where: {
				userId: parseInt(userId.value),
			},
			orderBy: { createdAt: "desc" },
		});
	}

	return (
		<div className="min-h-screen">
			<section className="max-w-6xl mx-auto px-4 py-16">
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
					<span className="text-purple-400 text-sm font-medium">
						🧠 Your space • Draft, edit, publish
					</span>
				</div>
				<h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
					My Dashboard
				</h1>
				<p className="text-lg text-white/70 mb-8 max-w-2xl">
					Create posts, polish them, and share them with the world.
				</p>
				<div className="flex flex-wrap gap-4">
					<Link className="btn-primary px-8 py-3" href="/dashboard/create">
						✨ Create new blog
					</Link>
					<Link className="btn-secondary px-8 py-3" href="/">
						View public feed
					</Link>
				</div>
			</section>

			<section className="max-w-6xl mx-auto px-4 pb-16">
				{blogs.length === 0 ? (
					<div className="card-glass p-8 text-center">
						<h3 className="text-2xl font-bold text-white mb-3">No blogs yet</h3>
						<p className="text-white/60 leading-relaxed">
							Create your first post and it will show up here.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{blogs.map((blog) => (
							<div key={blog.id} className="card-glass p-6 flex flex-col">
								<h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
									{blog.title}
								</h3>
								<p className="text-white/80 text-sm flex-grow mb-4 line-clamp-3">
									{blog.excerpt}
								</p>
								<div className="flex flex-wrap gap-2">
									<Link
										className="btn-secondary flex-1 text-center"
										href={`/blog/${blog.id}`}
									>
										Read
									</Link>
									<Link
										className="btn-secondary flex-1 text-center"
										href={`/dashboard/edit/${blog.id}`}
									>
										Edit
									</Link>
									<form
										action={deleteBlog.bind(null, blog.id)}
										className="flex-1"
									>
										<button className="btn-danger w-full" type="submit">
											Delete
										</button>
									</form>
								</div>
							</div>
						))}
					</div>
				)}
			</section>
		</div>
	);
}
