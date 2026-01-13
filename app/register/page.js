"use client";

import { useActionState } from "react";
import { register } from "./actions";
import Link from "next/link";

export default function RegisterPage() {
	const [state, formAction, pending] = useActionState(register, {
		error: null,
	});

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="card-glass max-w-md w-full p-8">
				<h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
					Create account
				</h1>
				<p className="text-white/70 text-sm mb-8">
					Start publishing your stories today
				</p>

				<form action={formAction} className="space-y-4">
					<div>
						<label className="block text-sm font-semibold text-white/80 mb-2">Email</label>
						<input className="input-field" name="email" type="email" placeholder="you@example.com" required />
					</div>
					<div>
						<label className="block text-sm font-semibold text-white/80 mb-2">Password</label>
						<input className="input-field" name="password" type="password" placeholder="Create a strong password" required />
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
						{pending ? "Creating..." : "Register"}
					</button>
				</form>

				<p className="text-center text-white/70 text-sm mt-6">
					Already have an account?{" "}
					<Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
						Login
				</Link>
			</p>
		</div>
	);
}
