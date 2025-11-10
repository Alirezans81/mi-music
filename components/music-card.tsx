import { Song } from "@/types/song";

export default function MusicCard({ data }: { data: Song }) {
  console.log(data);

  return <div className="w-full">MusicCard</div>;
}
