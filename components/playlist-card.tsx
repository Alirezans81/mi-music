import { Playlist } from "@/types/playlist";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

export default function PlaylistCard({ data }: { data: Playlist }) {
  return (
    <Card>
      <CardHeader className="flex gap-3">
        <Image
          alt={data.title}
          src={data.cover || ""}
          width={50}
          height={50}
          className="bg-background rounded-md"
        />
        <div className="flex flex-col gap-2">
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.songs.length + " Songs"}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end items-center">
        <CardAction className="w-full">
          <Button size="sm" className="w-full">
            See All Songs
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
