"use client";

import { useActionState } from "react";
import { register } from "./actions";
import Link from "next/link";

export default function RegisterPage() {
	const [state, formAction, pending] = useActionState(register, {
		error: null,
	});

	return (
		<div>
			<h1>Register</h1>
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
					Register
				</button>
			</form>
			<p style={{ marginTop: 10 }}>
				Already have an account? <Link href="/login">Login</Link>
			</p>
		</div>
	);
}
