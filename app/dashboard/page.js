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
		<div>
			<section className="hero">
				<div className="pill">🧠 Your space • Draft, edit, publish</div>
				<h1 className="title">My Dashboard</h1>
				<p className="subtitle">
					Create posts, polish them, and share them with the world.
				</p>
				<div className="btnRow" style={{ marginTop: 14 }}>
					<Link className="btn btnPrimary" href="/dashboard/create">
						Create new blog
					</Link>
					<Link className="btn" href="/">
						View public feed
					</Link>
				</div>
			</section>

			{blogs.length === 0 ? (
				<div className="card" style={{ marginTop: 16 }}>
					<h3 className="cardTitle">No blogs yet</h3>
					<p className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
						Create your first post and it will show up here.
					</p>
				</div>
			) : (
				<div className="grid">
					{blogs.map((blog) => (
						<div key={blog.id} className="col4">
							<div className="card">
								<h3 className="cardTitle">{blog.title}</h3>
								<p className="cardText">{blog.excerpt}</p>
								<div className="btnRow" style={{ marginTop: 12 }}>
									<Link className="btn" href={`/blog/${blog.id}`}>
										Read
									</Link>
									<Link className="btn" href={`/dashboard/edit/${blog.id}`}>
										Edit
									</Link>
									<form action={deleteBlog.bind(null, blog.id)}>
										<button className="btn btnDanger" type="submit">
											Delete
										</button>
									</form>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
