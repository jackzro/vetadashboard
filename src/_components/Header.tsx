"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";
import React from "react";
import {
  Sun,
  Moon,
  Menu,
  Home,
  Monitor,
  Aperture,
  Bell,
  Search,
} from "lucide-react";
import ProfileButton from "./ProfileButton";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Side/Sidebar";
import { useCompanyStore } from "@/store/CompanyStore";
import { Input } from "@/components/ui/input";

// export const ItemLink = React.memo(({ label, href, icon }: any) => {
//   return (
//     <Button variant="ghost" key={label}>
//       <span>{icon}</span>
//       <Link
//         key={label}
//         href={href}
//         className="text-sm font-medium transition-colors"
//       >
//         {label}
//       </Link>
//     </Button>
//   );
// });

const Header = () => {
  const companies = useCompanyStore((state: any) => state.companies);
  const { theme, setTheme } = useTheme();
  const routes = [
    {
      href: "/dashboard",
      label: "Home",
      icon: () => <Home />,
    },
    {
      href: "/dashboard",
      label: "Monitor",
      icon: () => <Monitor />,
    },
    {
      href: "/dashboard",
      label: "Others",
      icon: () => <Aperture />,
    },
    {
      href: "/dashboard",
      label: "Notification",
      icon: () => <Bell />,
    },
  ];

  return (
    <header className="flex justify-between py-3 px-1 bg-veta">
      <div className="px-2 flex h-16 items-center w-full justify-between">
        <div className="flex items-center lg:space-x-6">
          {companies.length !== 0 ? (
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6 mx-2" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Sidebar company={companies[0]} type={"header"} />
                  {/* {routes.map((route, i) => (
                      <Link
                        key={i}
                        href={route.href}
                        className="block px-2 py-1 text-lg"
                      >
                        {route.label}
                      </Link>
                    ))} */}
                </nav>
              </SheetContent>
            </Sheet>
          ) : null}

          {/* <div className="relative h-[70px] w-[200px]">
            <Link
              href="/dashboard"
              className="ml-4 lg:ml-0 flex items-center text-sm lg:text-2xl "
            >
              <Image
                alt="Veta Logo"
                src="/img/veta.png"
                // src="https://veta.co.id/wp-content/uploads/2023/06/3@4x-8-2048x825.png"
                layout="fill"
              />
          </Link>
          </div> */}
          <nav className="flex items-center w-32 dark:text-white text-black bg-white dark:bg-black rounded-lg">
            <Search className="h-6 w-6 ml-2" />

            <Input
              placeholder="Search ..."
              className="placeholder:text-black dark:placeholder:text-white  border-0 !outline-none border-transparent dark:bg-black focus:border-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 !border-none"
            />
          </nav>
        </div>

        <div className="flex items-center">
          <nav className="hidden md:flex items-center text-white">
            {routes.map((route, i) => (
              // <ItemLink label={label} icon={icon} href={href} />
              <Button variant="ghost" key={i} className="space-x-1">
                <span>{route.icon()}</span>

                <Link
                  key={i}
                  href={route.href}
                  className="text-sm transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="mr-6 text-white"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
          <ProfileButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
