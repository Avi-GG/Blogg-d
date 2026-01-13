"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(prevStateOrFormData, maybeFormData) {
	// Supports both signatures:
	// - useActionState: (prevState, formData)
	// - plain form action: (formData)
	const resolvedFormData =
		prevStateOrFormData && typeof prevStateOrFormData.get === "function"
			? prevStateOrFormData
			: maybeFormData;

	if (!resolvedFormData) {
		return { error: "Invalid form submission." };
	}

	const email = String(resolvedFormData.get("email") ?? "").trim();
	const password = String(resolvedFormData.get("password") ?? "");

	if (!email || !password) {
		return { error: "Email and password are required." };
	}

	// Check if user already exists
	const existingUser = await prisma.user.findUnique({
		where: { email },
	});

	if (existingUser) {
		if (!existingUser.password) {
			return {
				error:
					"This email is already registered with Google. Use Google sign-in.",
			};
		}
		return { error: "User already exists. Try logging in instead." };
	}

	// Hash password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Create user
	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
		},
	});

	// Set cookie
	const cookieStore = await cookies();
	cookieStore.set("userId", String(user.id), {
		httpOnly: true,
		path: "/",
	});

	redirect("/dashboard");
}
