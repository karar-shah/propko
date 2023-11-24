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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import serverActions from "@/server/actions";
import { excludeField } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    mode: "all",
  });
  const handleSubmit = async (values: AuthSchema) => {
    const res = await serverActions.auth.signup(values);
    if (res.succeed && res.data) {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (!res?.ok || res.error) {
        return router.replace("/signin");
      }
      return window.location.reload();
    }
    if (res.code === "EMAIL_ALREADY_EXISTS") {
      form.setError("email", {
        message: "Email already registered.",
        type: "validate",
      });
    }
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Spinner /> : "Sign up"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
