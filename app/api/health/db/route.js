import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
	try {
		await prisma.$queryRaw`SELECT 1`;
		return NextResponse.json({ ok: true });
	} catch (e) {
		return NextResponse.json(
			{
				ok: false,
				name: e?.name,
				code: e?.code,
				message: e?.message,
			},
			{ status: 500 }
		);
	}
}
