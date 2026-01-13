"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { updateBlog } from "./actions";
import { useRouter } from "next/navigation";

export default function EditBlogPage({ params }) {
	const { id } = use(params);
	const [blog, setBlog] = useState(null);
	const router = useRouter();

	useEffect(() => {
		fetch(`/api/blogs/${id}`)
			.then((res) => res.json())
			.then(setBlog);
	}, [id]);

	if (!blog) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="card-glass p-8 text-center">
					<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-purple-400 border-r-transparent" />
					<p className="text-white/70 mt-4">Loading...</p>
				</div>
			</div>
		);
	}

	async function handleUpdate(formData) {
		await updateBlog(id, formData);
	}

	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-12">
			<div className="card-glass p-10 w-full max-w-2xl">
				<h1 className="text-4xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
					Edit Blog
				</h1>
				<p className="text-white/60 mb-8">
					Make changes and publish your updates.
				</p>
				<div className="h-px bg-linear-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 mb-8" />

				<form action={handleUpdate} className="space-y-6">
					<div>
						<label className="block text-white font-semibold mb-3">Title</label>
						<input
							className="input-field w-full"
							name="title"
							defaultValue={blog.title}
							required
						/>
					</div>

					<div>
						<label className="block text-white font-semibold mb-3">
							Content
						</label>
						<textarea
							className="input-field w-full resize-none"
							name="content"
							rows={10}
							defaultValue={blog.content}
							required
						/>
					</div>

					<button
						type="submit"
						className="btn-primary w-full py-3 mt-8 font-semibold"
					>
						💾 Save Changes
					</button>
				</form>
			</div>
		</div>
	);
}
