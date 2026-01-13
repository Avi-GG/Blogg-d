"use client";

import { useActionState } from "react";
import { login } from "./actions";
import Link from "next/link";

function GoogleIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
		>
			<path
				fill="#EA4335"
				d="M12 10.2v3.9h5.5c-.2 1.2-1.4 3.6-5.5 3.6a6.3 6.3 0 0 1 0-12.6c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.7 4.7 14.6 3.6 12 3.6A8.4 8.4 0 1 0 12 20.4c4.9 0 8.1-3.4 8.1-8.1 0-.5-.1-.9-.1-1.3H12z"
			/>
		</svg>
	);
}

export default function LoginPage() {
	const [state, formAction, pending] = useActionState(login, { error: null });

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="card-glass max-w-md w-full p-8">
				<h1 className="text-4xl font-black bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
					Welcome back
				</h1>
				<p className="text-white/70 text-sm mb-8">
					Sign in to write, edit, and manage your blogs
				</p>

				<a href="/api/auth/google" className="w-full block mb-6">
					<button className="w-full px-4 py-3 rounded-lg font-bold bg-white text-slate-900 hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2">
						<GoogleIcon /> Continue with Google
					</button>
				</a>

				<div className="relative mb-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-white/10"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-2 bg-gradient text-white/50">Or email</span>
					</div>
				</div>

				<form action={formAction} className="space-y-4">
					<div>
						<label className="block text-sm font-semibold text-white/80 mb-2">
							Email
						</label>
						<input
							className="input-field"
							name="email"
							type="email"
							placeholder="you@example.com"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-semibold text-white/80 mb-2">
							Password
						</label>
						<input
							className="input-field"
							name="password"
							type="password"
							placeholder="••••••••"
							required
						/>
					</div>

					{state?.error && (
						<div className="p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-sm">
							{state.error}
						</div>
					)}

					<button
						type="submit"
						className="btn-primary w-full"
						disabled={pending}
					>
						{pending ? "Signing in..." : "Login"}
					</button>
				</form>

				<p className="text-center text-white/70 text-sm mt-6">
					Don&apos;t have an account?{" "}
					<Link
						href="/register"
						className="text-cyan-400 hover:text-cyan-300 font-semibold"
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}
