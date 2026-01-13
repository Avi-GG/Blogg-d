"use client";

import { useActionState } from "react";
import { register } from "./actions";
import Link from "next/link";

export default function RegisterPage() {
	const [state, formAction, pending] = useActionState(register, {
		error: null,
	});

	return (
		<div className="card formCard">
			<h1 className="title" style={{ fontSize: 32 }}>
				Create your account
			</h1>
			<p className="subtitle" style={{ marginTop: 6 }}>
				Start publishing in minutes.
			</p>

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
						placeholder="Create a strong password"
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
					{pending ? "Creating…" : "Register"}
				</button>
			</form>

			<p className="muted" style={{ marginTop: 12 }}>
				Already have an account?{" "}
				<Link className="navLink" href="/login">
					Login
				</Link>
			</p>
		</div>
	);
}
