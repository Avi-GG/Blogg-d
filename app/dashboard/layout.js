import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
	const cookieStore = await cookies();
	const userId = cookieStore.get("userId");

	if (!userId) {
		redirect("/login");
	}

	return <>{children}</>;
}
