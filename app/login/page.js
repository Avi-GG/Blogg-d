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
		<div className="card formCard">
			<h1 className="title" style={{ fontSize: 32 }}>
				Welcome back
			</h1>
			<p className="subtitle" style={{ marginTop: 6 }}>
				Sign in to write, edit and manage your blogs.
			</p>

			<div className="divider" />

			<a href="/api/auth/google" style={{ display: "block" }}>
				<button
					className="btn btnGoogle"
					type="button"
					style={{ width: "100%" }}
				>
					<GoogleIcon /> Continue with Google
				</button>
			</a>

			<div className="divider" />

			<form action={formAction}>
				<div className="field">
					<label className="label">Email</label>
					<input
						className="input"
						name="email"
						type="email"
						placeholder="you@example.com"
						required
					/>
				</div>
				<div className="field">
					<label className="label">Password</label>
					<input
						className="input"
						name="password"
						type="password"
						placeholder="••••••••"
						required
					/>
				</div>

				{state?.error && <p className="error">{state.error}</p>}

				<button
					type="submit"
					className="btn btnPrimary"
					style={{ width: "100%", marginTop: 14 }}
					disabled={pending}
				>
					{pending ? "Signing in…" : "Login"}
				</button>
			</form>

			<p className="muted" style={{ marginTop: 12 }}>
				Don&apos;t have an account?{" "}
				<Link className="navLink" href="/register">
					Register
				</Link>
			</p>
		</div>
	);
}
