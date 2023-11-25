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
import { AuthSchema, authSchema } from "@/validation/auth";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ApiResCode } from "@/typing/api";

export default function SigninForm() {
  const router = useRouter();
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    mode: "all",
  });
  const handleSubmit = async (values: AuthSchema) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (res?.error || !res?.ok) {
      let error: { code: ApiResCode; data?: any } | undefined;
      if (res?.error) {
        try {
          error = JSON.parse(res?.error);
        } catch (err) {
          console.log(err);
        }
      }
      if (error?.code === "EMAIL_NOT_VERIFIED") {
        return router.push(`/signup/verification?token=${error.data}`);
      }
      if (error?.code === "NOT_FOUND") {
        form.setError("email", {
          message: "Email not registered.",
          type: "validate",
        });
      }
      if (error?.code === "WRONG_PASSWORD") {
        form.setError("password", {
          message: "Wrong password.",
          type: "validate",
        });
      }
      return;
    }
    window.location.reload();
  };
  return (
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link href={"/reset-password"} className="link">
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Spinner /> : "Sign in"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
