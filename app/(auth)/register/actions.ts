"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const registerAction = async (data: {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}) => {
  const { first_name, last_name, username, password } = data;

  // register
  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/site/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name, last_name, username, password }),
    }
  );

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

  redirect("/songs");
};
