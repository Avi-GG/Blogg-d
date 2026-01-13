import { createBlog } from "./actions";

export default function CreateBlogPage() {
	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-12">
			<div className="card-glass p-10 w-full max-w-2xl">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
					Create Blog
				</h1>
				<p className="text-white/60 mb-8">
					Write something people actually want to read.
				</p>
				<div className="h-px bg-linear-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 mb-8" />

				<form action={createBlog} className="space-y-6">
					<div>
						<label className="block text-white font-semibold mb-3">Title</label>
						<input
							className="input-field w-full"
							name="title"
							placeholder="A catchy headline…"
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
							placeholder="Write your post…"
							required
						/>
					</div>

					<button
						className="btn-primary w-full py-3 mt-8 font-semibold"
						type="submit"
					>
						✨ Publish
					</button>
				</form>
			</div>
		</div>
	);
}
