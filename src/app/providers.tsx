"use client";

import { Toaster } from "@/components/ui/toaster";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  session?: Session | null;
};

export function Providers({ children, session }: Props) {
  return (
    <ThemeProvider attribute="class">
      <Toaster />
      <SessionProvider session={session}>{children}</SessionProvider>
    </ThemeProvider>
  );
}
