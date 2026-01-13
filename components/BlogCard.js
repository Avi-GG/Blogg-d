"use client";

import Link from "next/link";

export default function BlogCard({ blog, showActions = false, onDelete }) {
	return (
		<div style={{ border: "1px solid gray", padding: 12, marginBottom: 10 }}>
			<h3>{blog.title}</h3>
			<p>{blog.excerpt}</p>

			<Link href={`/blog/${blog.id}`}>Read full blog</Link>

			{showActions && (
				<div style={{ marginTop: 8 }}>
					<Link href={`/dashboard/edit/${blog.id}`}>Edit</Link>
					<button style={{ marginLeft: 8 }} onClick={() => onDelete(blog.id)}>
						Delete
					</button>
				</div>
			)}
		</div>
	);
}
