"use client";

import BlogCard from "@/components/BlogCard";
import { useRouter } from "next/navigation";

export function BlogList({ blogs }) {
	const router = useRouter();

	async function handleDelete(id) {
		await fetch(`/api/blogs/${id}`, { method: "DELETE" });
		router.refresh();
	}

	if (blogs.length === 0) {
		return <p>No blogs yet. Create your first blog!</p>;
	}

	return (
		<>
			{blogs.map((blog) => (
				<BlogCard
					key={blog.id}
					blog={blog}
					showActions
					onDelete={handleDelete}
				/>
			))}
		</>
	);
}
