"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Formik } from "formik";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { loginAction } from "./actions";

const schema = z.object({
  username: z.string().min(1, "Enter your username."),
  password: z.string().min(1, "Enter your password."),
});
type FormValues = z.infer<typeof schema>;

async function fetcher(_url: string, { arg }: { arg: FormValues }) {
  await loginAction(arg);
}

export default function LoginForm() {
  const router = useRouter();

  const { trigger, isMutating, error } = useSWRMutation(
    "/api/auth/login",
    fetcher
  );

  return (
    <Formik<FormValues>
      initialValues={{
        username: "",
        password: "",
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
      onSubmit={(values) => {
        trigger(values, {
          onSuccess: () => {
            router.replace("/songs");
          },
        });
      }}
    >
      {({ values, handleBlur, handleChange, handleSubmit, errors }) => (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your username and password below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    type="username"
                  />
                  <Label htmlFor="username" className="font-light text-red-500">
                    {errors.username}
                  </Label>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    type="password"
                  />
                  <Label htmlFor="password" className="font-light text-red-500">
                    {errors.password}
                  </Label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            {error && (
              <Label className="font-light text-red-500 mb-2">
                {error.message}
              </Label>
            )}
            <Button
              type="submit"
              onClick={() => handleSubmit()}
              className="w-full"
              disabled={isMutating}
            >
              Submit
            </Button>
            <Link href="/register" className="w-full">
              <Button variant="outline" className="w-full">
                Register
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </Formik>
  );
}
