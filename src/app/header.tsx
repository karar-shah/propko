"use client";
import { Session } from "next-auth";
import ThemeToggle from "../components/theme-toggle";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, LogoutButton } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Props = {
  session?: Session | null;
};

const menuList = [
  {
    label: "Dashboard",
    href: "/",
  },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  // if (pathname.startsWith("/listing")) return null;
  return (
    <header className="sticky top-0 z-50 w-full border-b dark:border-slate-700 px-10">
      <div className="flex h-[60px] items-center">
        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="items-center flex md:gap-x-6 ">
            {menuList.map((menuItem, index) => (
              <Link
                className="hidden py-3 font-normal text-black dark:text-white transition-all md:block hover:text-primary dark:hover:text-primary"
                href={menuItem.href}
                key={index}
              >
                {menuItem.label}
              </Link>
            ))}
          </div>
          <nav className="flex items-center gap-5">
            <ThemeToggle />
            {session && <UserDropdownMenu session={session} />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export function UserDropdownMenu({ session }: { session: Session }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-auto p-2 rounded-full aspect-square"
        >
          <PersonIcon className="w-5 h-5 text-primary-dark" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="w-56">
        <DropdownMenuLabel>
          <span className="block">{session?.user.email}</span>
          {/* <span className="block text-sm font-normal">
            {session?.user.email}
          </span> */}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/change-password"}>Change Password</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
