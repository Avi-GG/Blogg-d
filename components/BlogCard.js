"use client";

import Link from "next/link";

export default function BlogCard({ blog, showActions = false, onDelete }) {
	return (
		<div className="card-glass p-6 flex flex-col h-full">
			<h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
				{blog.title}
			</h3>
			<p className="text-white/60 text-sm mb-4">
				{blog.user?.email ? `By ${blog.user.email}` : ""}
				{blog.createdAt ? " • " : ""}
				{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
			</p>
			<p className="text-white/80 text-sm flex-grow mb-4 line-clamp-3">
				{blog.excerpt}
			</p>

			<div className="flex flex-wrap gap-2">
				<Link
					href={`/blog/${blog.id}`}
					className="btn-secondary flex-1 text-center"
				>
					Read
				</Link>

				{showActions && (
					<>
						<Link
							href={`/dashboard/edit/${blog.id}`}
							className="btn-secondary flex-1 text-center"
						>
							Edit
						</Link>
						<button
							className="btn-danger flex-1"
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
