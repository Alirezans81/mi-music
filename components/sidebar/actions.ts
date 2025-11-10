"use server";

import { Token } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("token");
  redirect("/login");
};

export const getPlaylists = async () => {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const token: Token | null = tokenCookie
    ? JSON.parse(tokenCookie.value)
    : null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/playlist`, {
    headers: {
      Authorization: `Bearer ${token?.access_token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return data;
};
