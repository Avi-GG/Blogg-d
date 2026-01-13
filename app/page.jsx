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
			<section className="hero">
				<div className="pill">✨ Fresh posts • Read & write</div>
				<h1 className="title">All Blogs</h1>
				<p className="subtitle">
					Discover short, real stories from the community. Sign in to create and
					manage your own posts.
				</p>
			</section>

			{dbError && (
				<div
					className="card"
					style={{ marginTop: 16, borderColor: "rgba(251, 113, 133, 0.35)" }}
				>
					<p className="error">
						Database connection failed (code: {dbError.code ?? "unknown"}).
					</p>
					<p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
						On Vercel, make sure `DATABASE_URL` is set and your Supabase project
						is online. You can also test `/api/health/db`.
					</p>
				</div>
			)}

			<div className="grid">
				{blogs.map((blog) => (
					<div key={blog.id} className="col4">
						<BlogCard blog={blog} />
					</div>
				))}
			</div>
		</div>
	);
}
