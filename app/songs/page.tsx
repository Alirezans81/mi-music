import MusicCard from "@/components/music-card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AddSongDialog } from "@/components/dialogs/songs/add-song-dialog";
import { tempSongs } from "@/consts/songs";
import { Song } from "@/types/song";

const getTempSongs = (): Promise<Song[]> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(tempSongs);
    }, 500);

    return () => clearTimeout(timeout);
  });
};

export default async function Dashboard() {
  // const songs = await getSongs();
  const songs = await getTempSongs();

  return (
    <div className="w-full min-h-full flex flex-col gap-3">
      <div className="w-full flex justify-between">
        <div className="flex gap-2 items-center">
          <SidebarTrigger />
          <span>Songs</span>
        </div>
        <AddSongDialog />
      </div>
      <div className="grid xl:grid-cols-4 gap-3 py-2 min-h-full">
        {songs.length ? (
          songs.map((song) => (
            <div key={song.id}>
              <MusicCard data={song} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center">
            <span className="text-muted-foreground">
              {"There's no songs available."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
