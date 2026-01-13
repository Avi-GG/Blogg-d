import BlogCard from "@/components/BlogCard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
	const blogs = await prisma.blog.findMany({
		orderBy: { createdAt: "desc" },
		include: { user: { select: { email: true } } },
	});

	return (
		<div>
			<h1>All Blogs</h1>
			{blogs.map((blog) => (
				<BlogCard key={blog.id} blog={blog} />
			))}
		</div>
	);
}
