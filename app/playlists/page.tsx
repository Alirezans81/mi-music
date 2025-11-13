import { getPlaylists } from "./actions";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AddPlaylistDialog } from "@/components/dialogs/playlists/add-playlist-dialog";
import PlaylistCard from "@/components/playlist-card";
import { tempPlaylists } from "@/consts/playlists";
import { Playlist } from "@/types/playlist";

const getTempPlaylists = (): Promise<Playlist[]> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(tempPlaylists);
    }, 500);

    return () => clearTimeout(timeout);
  });
};

export default async function Dashboard() {
  // const playlists = await getPlaylists();
  const playlists = await getTempPlaylists();

  return (
    <div className="w-full min-h-full flex flex-col gap-3">
      <div className="w-full flex justify-between">
        <div className="flex gap-2 items-center">
          <SidebarTrigger />
          <span>Playlists</span>
        </div>
        <AddPlaylistDialog />
      </div>
      <div className="grid xl:grid-cols-4 gap-3 py-2 min-h-full">
        {playlists.length ? (
          playlists.map((playlist) => (
            <div key={playlist.id}>
              <PlaylistCard data={playlist} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center">
            <span className="text-muted-foreground">
              {"There's no playlists available."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
