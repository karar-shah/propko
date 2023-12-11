"use client";
import apiClient from "@/client/api";
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
import { useToast } from "@/components/ui/use-toast";
import {
  ChangePasswordSchema,
  CreatePasswordSchema,
  changePasswordSchema,
  createPasswordSchema,
} from "@/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ChangePasswordForm() {
  const { toast } = useToast();
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onSubmit",
  });
  const handleSubmit = async (values: ChangePasswordSchema) => {
    const res = await apiClient.auth.changePassword({
      type: "password",
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
    if (!res.succeed) {
      if (res.code === "WRONG_PASSWORD") {
        form.setError("currentPassword", {
          message: "Wrong password.",
          type: "validate",
        });
      } else {
        toast({
          title: "Got some error, while processing your request.",
          variant: "destructive",
        });
      }
      return;
    }
    toast({
      title: "Password changed successfully.",
    });
    setTimeout(() => {
      return window.location.reload();
    }, 200);
  };
  return (
    <div className="p-4 sm:p-7">
      <>
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-secondary-800 dark:text-white">
            Change Password
          </h1>
        </div>
        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid gap-y-4">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
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
    </div>
  );
}
