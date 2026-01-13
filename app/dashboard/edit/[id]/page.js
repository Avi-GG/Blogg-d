import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateBlog } from "./actions";

export default async function EditBlogPage({ params }) {
	const { id } = await params;

	const cookieStore = await cookies();
	const userId = cookieStore.get("userId");
	if (!userId) {
		redirect("/login");
	}

	const blogId = Number(id);
	const currentUserId = parseInt(userId.value, 10);

	const blog = await prisma.blog.findFirst({
		where: { id: blogId, userId: currentUserId },
		select: { id: true, title: true, content: true },
	});

	if (!blog) {
		redirect("/dashboard");
	}

	return (
		<div>
			<h1>Edit Blog</h1>

			<form action={updateBlog.bind(null, blog.id)}>
				<div>
					<label>Title</label>
					<br />
					<input name="title" defaultValue={blog.title} required />
				</div>

				<div style={{ marginTop: 10 }}>
					<label>Content</label>
					<br />
					<textarea
						name="content"
						rows={6}
						defaultValue={blog.content}
						required
					/>
				</div>

				<button type="submit" style={{ marginTop: 10 }}>
					Update
				</button>
			</form>
		</div>
	);
}
