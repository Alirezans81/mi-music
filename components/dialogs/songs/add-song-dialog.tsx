"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik } from "formik";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { addSongAction } from "./actions";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
  album_name: z.string().min(1, "Enter the album name."),
  artist_name: z.string().min(1, "Enter the artist name."),
  duration: z.string().min(1, "Enter the duration."),
  title: z.string().min(1, "Enter the title."),
  year: z.string().min(1, "Enter the year."),
  file: z.instanceof(File).optional(),
  format: z.string().min(1, "Enter the format."),
});
type FormValues = z.infer<typeof schema>;

const addSong = async (
  _key: string,
  options: {
    arg: {
      title: string;
      album_name: string;
      artist_name: string;
      duration: string;
      year: string;
      file: File;
      format: string;
    };
  }
) => {
  const { arg: data } = options;
  return await addSongAction(data);
};

export function AddSongDialog() {
  const router = useRouter();

  const { trigger, isMutating, error } = useSWRMutation("add-song", addSong);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <Formik<FormValues>
      initialValues={{
        album_name: "",
        artist_name: "",
        duration: "",
        title: "",
        year: "",
        file: new File([], ""),
        format: "",
      }}
      validate={(values) => {
        const result = schema.safeParse(values);
        if (result.success) return {};
        const errors: Record<string, string> = {};
        result.error.issues.forEach((err) => {
          errors[err.path[0] as string] = err.message;
        });
        return errors;
      }}
      onSubmit={(values, { setFieldError }) => {
        if (values.file) {
          trigger(
            values as {
              title: string;
              album_name: string;
              artist_name: string;
              duration: string;
              year: string;
              file: File;
              format: string;
            },
            {
              onSuccess: () => {
                router.refresh();
                toast.success("Song added successfully");
              },
            }
          );
        } else {
          setFieldError("file", "Select the file");
        }
      }}
    >
      {({
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        setFieldValue,
      }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">+ Add</Button>
          </DialogTrigger>
          <DialogContent className="w-sm">
            <DialogHeader>
              <DialogTitle>Add a new song</DialogTitle>
              <DialogDescription>
                To add a new song, please fill out the form below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  <Label htmlFor="username" className="font-light text-red-500">
                    {errors.title}
                  </Label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="artist_name">Artist</Label>
                  <Input
                    id="artist_name"
                    name="artist_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.artist_name}
                  />
                  <Label htmlFor="username" className="font-light text-red-500">
                    {errors.artist_name}
                  </Label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="album_name">Album</Label>
                  <Input
                    id="album_name"
                    name="album_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.album_name}
                    type="album_name"
                  />
                  <Label htmlFor="username" className="font-light text-red-500">
                    {errors.album_name}
                  </Label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.duration}
                  />
                  <Label htmlFor="username" className="font-light text-red-500">
                    {errors.duration}
                  </Label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.year}
                  />
                  <Label htmlFor="username" className="font-light text-red-500">
                    {errors.year}
                  </Label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="file">File</Label>
                  <Input
                    id="file"
                    name="file"
                    onChange={(e) => {
                      if (e.currentTarget.files && e.currentTarget.files[0]) {
                        setFieldValue("file", e.currentTarget.files[0]);
                        setFieldValue("format", e.currentTarget.files[0].type);
                      }
                    }}
                    type="file"
                    accept="audio/*"
                  />
                  <Label htmlFor="username" className="font-light text-red-500">
                    {errors.file}
                  </Label>
                </div>
              </div>
            </form>
            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                variant="outline"
                disabled={isMutating}
                onClick={() => handleSubmit()}
              >
                Add
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Formik>
  );
}
