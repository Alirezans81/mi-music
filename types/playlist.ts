import { Song } from "./song";

export type Playlist = {
  title: string;
  created_at: string;
  id: number;
  cover: string;
  updated_at: string;
  songs: Song[];
};
