import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { first_name, last_name, username, password } = await req.json();

    // register
    const registerBackendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/site/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name, last_name, username, password }),
      }
    );

    const registerData = await registerBackendRes.json();

    if (!registerBackendRes.ok) {
      return NextResponse.json(
        { message: registerBackendRes.statusText || "Invalid credentials" },
        { status: registerBackendRes.status }
      );
    }

    // login
    const loginBackendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/site/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const loginData = await loginBackendRes.json();

    if (!loginBackendRes.ok) {
      return NextResponse.json(
        { message: loginBackendRes.statusText || "Invalid credentials" },
        { status: loginBackendRes.status }
      );
    }

    // set cookie
    const cookiesStore = await cookies();
    cookiesStore.set({
      name: "token",
      value: JSON.stringify(loginData.result),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
      user: registerData.result,
      token: loginData.result,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
