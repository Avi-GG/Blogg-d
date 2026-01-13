import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export async function GET(request) {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	if (!clientId) {
		return NextResponse.json(
			{ error: "Missing GOOGLE_CLIENT_ID" },
			{ status: 500 }
		);
	}

	const origin = new URL(request.url).origin;
	const redirectUri = `${origin}/api/auth/google/callback`;
	const state = crypto.randomBytes(24).toString("hex");

	const url = new URL(GOOGLE_AUTH_URL);
	url.searchParams.set("client_id", clientId);
	url.searchParams.set("redirect_uri", redirectUri);
	url.searchParams.set("response_type", "code");
	url.searchParams.set("scope", "openid email profile");
	url.searchParams.set("state", state);
	url.searchParams.set("prompt", "select_account");

	const res = NextResponse.redirect(url);
	res.cookies.set("google_oauth_state", state, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 10 * 60,
	});

	return res;
}
