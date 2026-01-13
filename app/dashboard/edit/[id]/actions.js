"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function updateBlog(blogId, formData) {
	const cookieStore = await cookies();
	const userId = cookieStore.get("userId");
	if (!userId) {
		redirect("/login");
	}

	const title = formData.get("title");
	const content = formData.get("content");

	const id = typeof blogId === "string" ? parseInt(blogId, 10) : blogId;
	const currentUserId = parseInt(userId.value, 10);

	const blog = await prisma.blog.findUnique({
		where: { id },
		select: { id: true, userId: true },
	});

	if (!blog || blog.userId !== currentUserId) {
		redirect("/dashboard");
	}

	await prisma.blog.update({
		where: { id },
		data: {
			title: String(title ?? "").trim(),
			content: String(content ?? ""),
			excerpt: String(content ?? "").slice(0, 40) + "...",
		},
	});

	revalidatePath("/");
	revalidatePath("/dashboard");
	redirect("/dashboard");
}
