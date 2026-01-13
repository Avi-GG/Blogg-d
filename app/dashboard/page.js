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
			<h1>My Dashboard</h1>
			<Link href="/dashboard/create">Create New Blog</Link>

			{blogs.length === 0 ? (
				<p>No blogs yet. Create your first blog!</p>
			) : (
				blogs.map((blog) => (
					<div
						key={blog.id}
						style={{ border: "1px solid gray", padding: 12, marginBottom: 10 }}
					>
						<h3>{blog.title}</h3>
						<p>{blog.excerpt}</p>

						<Link href={`/blog/${blog.id}`}>Read full blog</Link>

						<div style={{ marginTop: 8 }}>
							<Link href={`/dashboard/edit/${blog.id}`}>Edit</Link>
							<form
								action={deleteBlog.bind(null, blog.id)}
								style={{ display: "inline" }}
							>
								<button type="submit" style={{ marginLeft: 8 }}>
									Delete
								</button>
							</form>
						</div>
					</div>
				))
			)}
		</div>
	);
}
