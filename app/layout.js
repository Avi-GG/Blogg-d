import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "./logout/actions";

export default async function RootLayout({ children }) {
	const cookieStore = await cookies();
	const userId = cookieStore.get("userId");
	const isLoggedIn = Boolean(userId?.value);

	return (
		<html>
			<body>
				<header style={{ borderBottom: "1px solid #ddd" }}>
					<nav
						style={{
							display: "flex",
							gap: 12,
							alignItems: "center",
							justifyContent: "space-between",
							padding: "12px 16px",
							maxWidth: 1100,
							margin: "0 auto",
						}}
					>
						<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
							<Link href="/">Home</Link>
							{isLoggedIn && <Link href="/dashboard">Dashboard</Link>}
						</div>

						<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
							{!isLoggedIn ? (
								<Link href="/login">Login</Link>
							) : (
								<form action={logout}>
									<button type="submit">Logout</button>
								</form>
							)}
						</div>
					</nav>
				</header>

				<main style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
					{children}
				</main>
			</body>
		</html>
	);
}
