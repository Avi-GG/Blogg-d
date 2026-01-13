"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function createBlog(formData) {
	const cookieStore = await cookies();
	const userId = cookieStore.get("userId");

	if (!userId) {
		redirect("/login");
	}

	const currentUserId = parseInt(userId.value, 10);
	const user = await prisma.user.findUnique({
		where: { id: currentUserId },
		select: { id: true },
	});

	if (!user) {
		cookieStore.delete("userId");
		redirect("/login");
	}

	const title = String(formData.get("title") ?? "").trim();
	const content = String(formData.get("content") ?? "");

	try {
		await prisma.blog.create({
			data: {
				title,
				content,
				excerpt: content.slice(0, 40) + "...",
				userId: currentUserId,
			},
		});
	} catch (error) {
		console.error("Error creating blog:", error);
		// Stale cookie (or deleted user)
		if (error?.code === "P2003") {
			cookieStore.delete("userId");
			redirect("/login");
		}
		throw error;
	}

	revalidatePath("/");
	revalidatePath("/dashboard");
	redirect("/dashboard");
}
