"use server";

import { Token } from "@/types/auth";
import { Song } from "@/types/song";
import { cookies } from "next/headers";

export const addSongAction = async (data: {
  title: string;
  album_name: string;
  artist_name: string;
  duration: string;
  year: string;
  file: File;
  format: string;
}): Promise<Song | null> => {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const token: Token | null = tokenCookie
    ? JSON.parse(tokenCookie.value)
    : null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/song`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.access_token}`,
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return resData;
};
