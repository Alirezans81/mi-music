import { AddPlaylistDialog } from "@/components/dialogs/playlists/add-playlist-dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="w-full min-h-full flex flex-col gap-3">
      <div className="w-full flex justify-between">
        <div className="flex gap-2 items-center">
          <SidebarTrigger />
          <span>Playlists</span>
        </div>
        <AddPlaylistDialog />
      </div>
      <div className="grid xl:grid-cols-4 gap-3 py-2">
        {new Array(20).fill(0).map((_, index) => (
          <div key={index} className="col-span-1">
            <Skeleton className="w-full h-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
