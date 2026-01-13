import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "./logout/actions";

export default async function RootLayout({ children }) {
	const cookieStore = await cookies();
	const userId = cookieStore.get("userId");
	const isLoggedIn = Boolean(userId?.value);

	return (
		<html lang="en">
			<body className="bg-gradient min-h-screen text-white">
				<header className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/10">
					<nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
						<div className="flex items-center gap-8">
							<Link
								href="/"
								className="font-black text-3xl text-orange-500 hover:text-orange-400 transition"
							>
								Blogg&apos;d
							</Link>
							{isLoggedIn && (
								<Link
									href="/dashboard"
									className="text-white/80 hover:text-white transition font-medium text-lg"
								>
									Dashboard
								</Link>
							)}
						</div>

						<div className="flex items-center gap-3">
							{!isLoggedIn ? (
								<Link href="/login" className="btn-primary">
									Login
								</Link>
							) : (
								<form action={logout}>
									<button className="btn-secondary" type="submit">
										Logout
									</button>
								</form>
							)}
						</div>
					</nav>
				</header>

				<main className="max-w-7xl mx-auto px-4 py-12">{children}</main>
			</body>
		</html>
	);
}
