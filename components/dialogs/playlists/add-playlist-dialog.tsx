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
import { addPlaylistAction } from "./actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(1, "Enter the title."),
  cover: z.instanceof(File).optional(),
});
type FormValues = z.infer<typeof schema>;

const addPlaylist = async (
  _key: string,
  options: { arg: { title: string; cover: File } }
) => {
  const { arg: data } = options;
  return await addPlaylistAction(data);
};

export function AddPlaylistDialog() {
  const router = useRouter();

  const { trigger, isMutating, error } = useSWRMutation(
    "add-playlist",
    addPlaylist
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <Formik<FormValues>
      initialValues={{
        title: "",
        cover: new File([], ""),
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
        if (values.cover) {
          trigger(values as { title: string; cover: File }, {
            onSuccess: () => {
              router.refresh();
              toast.success("Playlist added successfully");
            },
          });
        } else {
          setFieldError("cover", "Select the cover");
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
              <DialogTitle>Add a new Playlist</DialogTitle>
              <DialogDescription>
                To add a new Playlist, please fill out the form below.
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
                  <Label htmlFor="cover">Cover</Label>
                  <input
                    id="cover"
                    name="cover"
                    className="bg-card px-4 py-2 rounded-md border focus:border-accent-foreground focus:ring-2 ring-border"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFieldValue("cover", e.currentTarget.files?.[0])
                    }
                  />
                  <Label htmlFor="cover" className="font-light text-red-500">
                    {errors.cover}
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
