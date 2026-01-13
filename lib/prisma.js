import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis;

if (!globalForPrisma.prisma) {
	const connectionString = process.env.DATABASE_URL;
	if (!connectionString) {
		throw new Error("DATABASE_URL is not set");
	}

	const poolConfig = {
		connectionString,
		connectionTimeoutMillis: 10_000,
		idleTimeoutMillis: 10_000,
		max: Number(process.env.PG_POOL_MAX ?? 5),
	};

	// Supabase requires SSL; in serverless environments this avoids certificate issues.
	if (connectionString.includes("supabase.co")) {
		poolConfig.ssl = { rejectUnauthorized: false };
	}

	const pool = new pg.Pool(poolConfig);
	const adapter = new PrismaPg(pool);
	globalForPrisma.prisma = new PrismaClient({
		adapter,
	});
}

export const prisma = globalForPrisma.prisma;
