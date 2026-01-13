import { createBlog } from "./actions";

export default function CreateBlogPage() {
	return (
		<div className="card formCard" style={{ maxWidth: 760 }}>
			<h1 className="title" style={{ fontSize: 34 }}>
				Create Blog
			</h1>
			<p className="subtitle" style={{ marginTop: 6 }}>
				Write something people actually want to read.
			</p>
			<div className="divider" />

			<form action={createBlog}>
				<div className="field">
					<label className="label">Title</label>
					<input
						className="input"
						name="title"
						placeholder="A catchy headline…"
						required
					/>
				</div>

				<div className="field">
					<label className="label">Content</label>
					<textarea
						className="textarea"
						name="content"
						rows={10}
						placeholder="Write your post…"
						required
					/>
				</div>

				<button
					className="btn btnPrimary"
					type="submit"
					style={{ width: "100%", marginTop: 14 }}
				>
					Publish
				</button>
			</form>
		</div>
	);
}
