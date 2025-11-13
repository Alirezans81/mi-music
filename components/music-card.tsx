import { Song } from "@/types/song";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Music2 } from "lucide-react";

export default function MusicCard({ data }: { data: Song }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>
          {data.artist_name + " - " + data.album_name + " (" + data.year + ")"}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{data.duration}</p>
        <CardAction className="flex gap-2">
          <Button size="sm" variant="secondary">
            Add To Playlist
          </Button>
          <Button size="sm">
            <Music2 />
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
