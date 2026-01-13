import BlogCard from "@/components/BlogCard";

export default async function Home() {
	const res = await fetch("http://localhost:3000/api/blogs", {
		cache: "no-store",
	});

	const blogs = await res.json();

	return (
		<div>
			<h1>All Blogs</h1>
			{blogs.map((blog) => (
				<BlogCard key={blog.id} blog={blog} />
			))}
		</div>
	);
}
