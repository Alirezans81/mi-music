"use server";

import { Token } from "@/types/auth";
import { Song } from "@/types/song";
import { cookies } from "next/headers";

export const getSongs = async (): Promise<Song[]> => {
  const tokenCookie = (await cookies()).get("token");
  const token: Token = tokenCookie ? JSON.parse(tokenCookie.value) : null;

  if (!token?.access_token) return [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/song`, {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });

  if (res.ok) return res.json();
  return [];
};
