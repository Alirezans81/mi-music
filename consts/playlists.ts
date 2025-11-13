import { Playlist } from "@/types/playlist";

export const tempPlaylists: Playlist[] = [
  {
    id: 0,
    title: "My Favorite",
    cover: "",
    created_at: "2025-06-01T00:00:00Z",
    updated_at: "2025-06-01T00:00:00Z",
    songs: [
      {
        id: 0,
        title: "Take My Breath Away",
        album_name: "Radio FM",
        artist_name: "The Weekend",
        duration: "3:45",
        year: "2023",
        format: "mp3",
        file: new File([], ""),
      },
    ],
  },
];
