let blogs = [
	{
		id: 1,
		title: "My First Blog",
		excerpt: "This is my blog",
		content: "This is my blog",
	},
	{
		id: 3,
		title: "My Second Blog",
		excerpt: "Another one by me",
		content: "Another one by me",
	},
];

export function getBlogs() {
	return blogs;
}

export function getBlogById(id) {
	return blogs.find((blog) => blog.id === id);
}

export function addBlog(blog) {
	blogs = [...blogs, blog];
}

export function updateBlog(updatedBlog) {
	blogs = blogs.map((blog) =>
		blog.id === updatedBlog.id ? updatedBlog : blog
	);
}
