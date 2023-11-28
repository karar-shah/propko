"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import serverActions from "@/server/actions";
import { ApiResponse } from "@/typing/api";
import { CreatePasswordSchema, createPasswordSchema } from "@/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewPasswordForm({ token }: { token: string }) {
  const [pwdChanged, setPwdChanged] = useState(false);
  const form = useForm<CreatePasswordSchema>({
    resolver: zodResolver(createPasswordSchema),
    mode: "all",
  });
  const handleSubmit = async (values: CreatePasswordSchema) => {
    const res = (await serverActions.auth.updatePassword(
      token,
      values.password
    )) as ApiResponse;
    if (res.succeed) {
      return setPwdChanged(true);
    }
    if (res.code === "NOT_FOUND") {
      form.setError("password", {
        message: "Token expired!.",
        type: "validate",
      });
    }
    if (res.code === "EXPIRED") {
      form.setError("password", {
        message: "Token expired!.",
        type: "validate",
      });
    }
  };
  return (
    <div className="p-4 sm:p-7">
      {pwdChanged ? (
        <div className="text-center flex flex-col items-center">
          <CheckCircledIcon className="w-10 h-10 text-green-500" />

          <h1 className="block text-2xl font-bold text-secondary-800 dark:text-white mt-5">
            Password Updated!
          </h1>
          <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
            Your password changed successfully.{" "}
            <Link href="/signin" className="link">
              Signin here
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-secondary-800 dark:text-white">
              Create New Password
            </h1>
          </div>
          <div className="mt-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid gap-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? <Spinner /> : "Continue"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </div>
  );
}
