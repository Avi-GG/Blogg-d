import "dotenv/config";
import { prisma } from "./lib/prisma.js";

async function testDatabase() {
	try {
		console.log("Testing database connection...");

		// Test 1: Count blogs
		const count = await prisma.blog.count();
		console.log("✓ Database connected! Current blog count:", count);

		// Test 2: Create a test blog
		const testBlog = await prisma.blog.create({
			data: {
				title: "Test Blog",
				content: "This is a test blog to verify database operations",
				excerpt: "This is a test blog to verify databa...",
			},
		});
		console.log("✓ Blog created successfully:", testBlog.id);

		// Test 3: Read the blog
		const blog = await prisma.blog.findUnique({
			where: { id: testBlog.id },
		});
		console.log("✓ Blog retrieved:", blog.title);

		// Test 4: Update the blog
		await prisma.blog.update({
			where: { id: testBlog.id },
			data: { title: "Updated Test Blog" },
		});
		console.log("✓ Blog updated successfully");

		// Test 5: Delete the blog
		await prisma.blog.delete({
			where: { id: testBlog.id },
		});
		console.log("✓ Blog deleted successfully");

		console.log("\n✅ All database operations working!");
		process.exit(0);
	} catch (error) {
		console.error("❌ Database error:", error.message);
		console.error(error);
		process.exit(1);
	}
}

testDatabase();
