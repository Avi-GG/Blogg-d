"use client";

import { useActionState } from "react";
import { login } from "./actions";
import Link from "next/link";

export default function LoginPage() {
	const [state, formAction, pending] = useActionState(login, { error: null });

	return (
		<div>
			<h1>Login</h1>
			<p style={{ marginTop: 10 }}>
				<a href="/api/auth/google">
					<button type="button">Continue with Google</button>
				</a>
			</p>
			<form action={formAction}>
				<div>
					<input name="email" type="email" placeholder="Email" required />
				</div>
				<div style={{ marginTop: 10 }}>
					<input
						name="password"
						type="password"
						placeholder="Password"
						required
					/>
				</div>

				{state?.error && (
					<p style={{ marginTop: 10, color: "crimson" }}>{state.error}</p>
				)}

				<button type="submit" style={{ marginTop: 10 }} disabled={pending}>
					Login
				</button>
			</form>
			<p style={{ marginTop: 10 }}>
				Don't have an account? <Link href="/register">Register</Link>
			</p>
		</div>
	);
}
