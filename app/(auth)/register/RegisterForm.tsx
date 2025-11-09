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

const schema = z
  .object({
    first_name: z.string().min(1, "Enter your first name."),
    last_name: z.string().min(1, "Enter your last name."),
    username: z.string().min(1, "Enter your username."),
    password: z
      .string()
      .min(1, "Enter your password.")
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must contain at least one number",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Password must contain at least one special character",
      }),
    confirm_password: z.string().min(1, "Enter your password."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });
type FormValues = z.infer<typeof schema>;

async function register(url: string, { arg }: { arg: FormValues }) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error();
      error.message = data.message;
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export default function RegisterForm() {
  const { trigger, isMutating, data } = useSWRMutation(
    "/api/auth/register",
    register
  );

  return (
    <Formik<FormValues>
      initialValues={{
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        confirm_password: "",
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
        trigger(values);
      }}
    >
      {({ values, handleBlur, handleChange, handleSubmit, errors }) => (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Register your account</CardTitle>
            <CardDescription>
              Fill out the form below to register to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    name="first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                  />
                  <Label
                    htmlFor="first-name"
                    className="font-light text-red-500"
                  >
                    {errors.first_name}
                  </Label>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    name="last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                  />
                  <Label
                    htmlFor="last-name"
                    className="font-light text-red-500"
                  >
                    {errors.last_name}
                  </Label>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
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
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirm_password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirm_password}
                    type="password"
                  />
                  <Label
                    htmlFor="confirm-password"
                    className="font-light text-red-500"
                  >
                    {errors.confirm_password}
                  </Label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            {(data as Error) && (
              <Label className="font-light text-red-500 mb-2">
                {data.message}
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
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </Formik>
  );
}
