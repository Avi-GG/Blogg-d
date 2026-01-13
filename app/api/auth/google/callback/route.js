import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

async function exchangeCodeForTokens({ code, redirectUri }) {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		throw new Error("Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET");
	}

	const body = new URLSearchParams({
		client_id: clientId,
		client_secret: clientSecret,
		code,
		grant_type: "authorization_code",
		redirect_uri: redirectUri,
	});

	const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
		method: "POST",
		headers: { "content-type": "application/x-www-form-urlencoded" },
		body,
	});

	if (!tokenRes.ok) {
		const text = await tokenRes.text();
		throw new Error(`Token exchange failed: ${tokenRes.status} ${text}`);
	}

	return tokenRes.json();
}

async function fetchGoogleUserInfo(accessToken) {
	const userRes = await fetch(
		"https://openidconnect.googleapis.com/v1/userinfo",
		{
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (!userRes.ok) {
		const text = await userRes.text();
		throw new Error(`Userinfo failed: ${userRes.status} ${text}`);
	}

	return userRes.json();
}

export async function GET(request) {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const origin = url.origin;
	const redirectUri = `${origin}/api/auth/google/callback`;

	const expectedState = request.cookies.get("google_oauth_state")?.value;
	if (!expectedState || !state || state !== expectedState) {
		return NextResponse.json({ error: "Invalid state" }, { status: 400 });
	}

	if (!code) {
		return NextResponse.json({ error: "Missing code" }, { status: 400 });
	}

	try {
		const tokens = await exchangeCodeForTokens({ code, redirectUri });
		const userInfo = await fetchGoogleUserInfo(tokens.access_token);

		const googleId = String(userInfo.sub ?? "").trim();
		const email = String(userInfo.email ?? "")
			.trim()
			.toLowerCase();

		if (!googleId || !email) {
			return NextResponse.json(
				{ error: "Google profile missing email/sub" },
				{ status: 400 }
			);
		}

		let user = await prisma.user.findUnique({ where: { googleId } });

		if (!user) {
			const existingByEmail = await prisma.user.findUnique({
				where: { email },
			});
			if (existingByEmail) {
				user = await prisma.user.update({
					where: { id: existingByEmail.id },
					data: { googleId },
				});
			} else {
				user = await prisma.user.create({
					data: {
						email,
						password: null,
						googleId,
					},
				});
			}
		}

		const res = NextResponse.redirect(new URL("/dashboard", origin));
		res.cookies.delete("google_oauth_state");
		res.cookies.set("userId", String(user.id), {
			httpOnly: true,
			path: "/",
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});
		return res;
	} catch (e) {
		return NextResponse.json(
			{ error: e?.message ?? "Google auth failed" },
			{ status: 500 }
		);
	}
}
