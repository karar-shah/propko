"use client";

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
      <SessionProvider session={session}>{children}</SessionProvider>
    </ThemeProvider>
  );
}
