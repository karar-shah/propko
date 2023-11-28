import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { getServerAuth } from "@/server/lib/auth";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PropKo",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "dark:bg-background-dark bg-background min-h-screen"
        )}
      >
        <Providers session={session}>
          <Header />
          <div className="min-h-[calc(100vh_-_60px)] flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
