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
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SigninForm() {
  const form = useForm({});
  return (
    <Form {...form}>
      <form>
        <div className="grid gap-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({}) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="abc@example.xyz" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({}) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link href={"/forgot-password"} className="link">
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" placeholder="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-10">
          <Button>Sign in</Button>
        </div>
      </form>
    </Form>
  );
}
