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
			<h1>All Blogs</h1>
			{dbError && (
				<div style={{ marginTop: 12, color: "crimson" }}>
					<p>Database connection failed (code: {dbError.code ?? "unknown"}).</p>
					<p>
						On Vercel, make sure `DATABASE_URL` is set and your Supabase project
						is online. You can also test `/api/health/db`.
					</p>
				</div>
			)}
			{blogs.map((blog) => (
				<BlogCard key={blog.id} blog={blog} />
			))}
		</div>
	);
}
