"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevStateOrFormData, maybeFormData) {
	const formData =
		prevStateOrFormData && typeof prevStateOrFormData.get === "function"
			? prevStateOrFormData
			: maybeFormData;

	if (!formData) {
		return { error: "Invalid form submission." };
	}

	const email = String(formData.get("email") ?? "").trim();
	const password = String(formData.get("password") ?? "");

	if (!email || !password) {
		return { error: "Email and password are required." };
	}

	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		return { error: "Invalid email or password." };
	}

	if (!user.password) {
		return {
			error: "This account uses Google sign-in. Click 'Continue with Google'.",
		};
	}

	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) {
		return { error: "Invalid email or password." };
	}

	const cookieStore = await cookies();
	cookieStore.set("userId", String(user.id), {
		httpOnly: true,
		path: "/",
	});

	redirect("/dashboard");
}
