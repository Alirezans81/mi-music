"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (data: {
  username: string;
  password: string;
}) => {
  const { username, password } = data;

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/site/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );

  const res = await backendRes.json();

  // set cookie
  const cookiesStore = await cookies();
  cookiesStore.set({
    name: "token",
    value: JSON.stringify(res.result),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/songs");
};
