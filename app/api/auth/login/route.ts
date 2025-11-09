import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // login
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/site/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: backendRes.statusText || "Invalid credentials" },
        { status: backendRes.status }
      );
    }

    // set cookie
    const cookiesStore = await cookies();
    cookiesStore.set({
      name: "token",
      value: JSON.stringify(data.result),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true, token: data.result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
