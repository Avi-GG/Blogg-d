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
		<div className="card formCard" style={{ maxWidth: 760 }}>
			<h1 className="title" style={{ fontSize: 34 }}>
				Edit Blog
			</h1>
			<p className="subtitle" style={{ marginTop: 6 }}>
				Refine your post and keep it sharp.
			</p>
			<div className="divider" />

			<form action={updateBlog.bind(null, blog.id)}>
				<div className="field">
					<label className="label">Title</label>
					<input
						className="input"
						name="title"
						defaultValue={blog.title}
						required
					/>
				</div>

				<div className="field">
					<label className="label">Content</label>
					<textarea
						className="textarea"
						name="content"
						rows={10}
						defaultValue={blog.content}
						required
					/>
				</div>

				<button
					className="btn btnPrimary"
					type="submit"
					style={{ width: "100%", marginTop: 14 }}
				>
					Save changes
				</button>
			</form>
		</div>
	);
}
