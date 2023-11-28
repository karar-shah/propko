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
import { IUser } from "@/server/lib/db/schemas/users";
import { ApiResCode, ApiResponse } from "@/typing/api";
import { ResetPasswordSchema, resetPasswordSchema } from "@/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircledIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ResendEmailButton from "./ResendEmail";

export default function ResetPasswordForm() {
  const [response, setResponse] = useState<ApiResponse<IUser>>();
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "all",
  });
  const handleSubmit = async (values: ResetPasswordSchema) => {
    const res = await serverActions.auth.resetPassword({
      email: values.email,
    });
    if (res.succeed) {
      return setResponse(res as any);
    }
    const resCode = res.code as ApiResCode;
    if (resCode === "NOT_FOUND") {
      form.setError("email", {
        message: "Email not registered.",
        type: "validate",
      });
    }
  };
  return (
    <div className="p-4 sm:p-7">
      {response?.succeed && response.data ? (
        <ResetPwdEmailSentView user={response.data} />
      ) : (
        <>
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-secondary-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
              Remember your password?{" "}
              <Link className="link" href="/signin">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid gap-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="abc@example.xyz"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <Spinner />
                    ) : (
                      "Reset Password"
                    )}
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

function ResetPwdEmailSentView({ user }: { user: IUser }) {
  return (
    <div className="text-center flex flex-col items-center">
      <InfoCircledIcon className="w-10 h-10 text-yellow-500" />
      <h1 className="block text-2xl font-bold text-secondary-800 dark:text-white mt-5">
        Email Sent!
      </h1>
      <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
        An email with reset password instructions is sent to your email (
        <span className="text-primary">{user.email}</span>).
      </p>
      <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
        Didn&apos;t receive email? <ResendEmailButton user={user} />
      </p>
    </div>
  );
}
