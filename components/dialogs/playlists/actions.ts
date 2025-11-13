"use server";

import { Token } from "@/types/auth";
import { Playlist } from "@/types/playlist";
import { cookies } from "next/headers";

export const addPlaylistAction = async (data: {
  title: string;
  cover: File;
}): Promise<Playlist | null> => {
  const { title, cover } = data;

  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const token: Token | null = tokenCookie
    ? JSON.parse(tokenCookie.value)
    : null;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("cover", cover);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/playlist`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.access_token}`,
    },
    body: formData,
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return resData;
};
