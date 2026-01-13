import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "./logout/actions";

export default async function RootLayout({ children }) {
	const cookieStore = await cookies();
	const userId = cookieStore.get("userId");
	const isLoggedIn = Boolean(userId?.value);

	return (
		<html lang="en">
			<body>
				<header className="navbar">
					<nav className="navInner">
						<div className="navLeft">
							<Link href="/" className="brand" aria-label="Blogg'd Home">
								<span className="brandText">Blogg&apos;d</span>
							</Link>

							<div className="navLinks">
								<Link className="navLink" href="/">
									Explore
								</Link>
								{isLoggedIn && (
									<Link className="navLink" href="/dashboard">
										Dashboard
									</Link>
								)}
							</div>
						</div>

						<div className="btnRow">
							{!isLoggedIn ? (
								<Link className="btn btnPrimary" href="/login">
									Login
								</Link>
							) : (
								<form action={logout}>
									<button className="btn" type="submit">
										Logout
									</button>
								</form>
							)}
						</div>
					</nav>
				</header>

				<main className="container">{children}</main>
			</body>
		</html>
	);
}
