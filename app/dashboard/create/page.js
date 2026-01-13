import { createBlog } from "./actions";

export default function CreateBlogPage() {
	return (
		<div>
			<h1>Create Blog</h1>

			<form action={createBlog}>
				<div>
					<label>Title</label>
					<br />
					<input name="title" required />
				</div>

				<div style={{ marginTop: 10 }}>
					<label>Content</label>
					<br />
					<textarea name="content" rows={6} required />
				</div>

				<button type="submit" style={{ marginTop: 10 }}>
					Create
				</button>
			</form>
		</div>
	);
}
