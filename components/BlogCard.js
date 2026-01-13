"use client";

import Link from "next/link";

export default function BlogCard({ blog, showActions = false, onDelete }) {
	return (
		<div className="card">
			<h3 className="cardTitle">{blog.title}</h3>
			<div className="meta">
				{blog.user?.email ? `By ${blog.user.email}` : ""}
				{blog.createdAt ? " • " : ""}
				{blog.createdAt ? new Date(blog.createdAt).toLocaleString() : ""}
			</div>
			<p className="cardText">{blog.excerpt}</p>

			<div className="btnRow" style={{ marginTop: 12 }}>
				<Link className="btn" href={`/blog/${blog.id}`}>
					Read full blog
				</Link>

				{showActions && (
					<>
						<Link className="btn" href={`/dashboard/edit/${blog.id}`}>
							Edit
						</Link>
						<button
							className="btn btnDanger"
							onClick={() => onDelete?.(blog.id)}
							type="button"
						>
							Delete
						</button>
					</>
				)}
			</div>
		</div>
	);
}
