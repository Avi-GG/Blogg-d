import BlogCard from "@/components/BlogCard";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export default async function Home() {
	let blogs = [];
	let dbError = null;

	try {
		blogs = await prisma.blog.findMany({
			orderBy: { createdAt: "desc" },
			include: { user: { select: { email: true } } },
		});
	} catch (e) {
		dbError = e;
	}

	return (
		<div>
			<section className="mb-12 ">
				<div className="mb-4 inline-block px-4 py-2 rounded-full bg-linear-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-sm text-white/70">
					✨ Fresh posts • Read & write
				</div>
				<h1 className="text-6xl font-black mb-4 bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
					All Blogs
				</h1>
				<p className="text-xl text-white/70 max-w-2xl">
					Discover short, real stories from the community. Sign in to create and
					manage your own posts.
				</p>
			</section>

			{dbError && (
				<div className="mb-12 p-6 card-glass border-red-500/40 bg-red-500/10">
					<p className="text-red-300 font-semibold mb-2">
						Database connection failed (code: {dbError.code ?? "unknown"}).
					</p>
					<p className="text-white/70 text-sm">
						On Vercel, make sure `DATABASE_URL` is set and your Supabase project
						is online.
					</p>
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{blogs.map((blog) => (
					<BlogCard key={blog.id} blog={blog} />
				))}
			</div>

			{blogs.length === 0 && !dbError && (
				<div className="text-center py-12">
					<p className="text-white/70 text-lg">
						No blogs yet. Be the first to write one!
					</p>
				</div>
			)}
		</div>
	);
}
