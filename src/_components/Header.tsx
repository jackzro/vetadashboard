"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";
import React from "react";
import { Sun, Moon, Menu } from "lucide-react";
import ProfileButton from "./ProfileButton";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function Header() {
  const { theme, setTheme } = useTheme();
  const routes = [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/dashboard",
      label: "Monitoring",
    },
    {
      href: "/dashboard",
      label: "Others",
    },
  ];
  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b-8">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6 mx-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link
                      key={i}
                      href={route.href}
                      className="block px-2 py-1 text-lg"
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative h-[70px] w-[200px]">
              <Link
                href="/dashboard"
                className="ml-4 lg:ml-0 flex items-center text-sm lg:text-2xl "
              >
                <Image
                  alt="Veta Logo"
                  // src="/img/veta.png"
                  src="https://veta.co.id/wp-content/uploads/2023/06/3@4x-8-2048x825.png"
                  layout="fill"
                />
                {/* {theme === "dark" ? (
                  <Image
                    alt="Agra Surya Energy Logo"
                    // src="/img/logo-agra.jpg"
                    src="https://mlnri5rsiwdc.i.optimole.com/w:200/h:49/q:mauto/f:avif/https://www.agrasuryaenergy.com/wp-content/uploads/2021/02/logo-agra.png"
                    layout="fill"
                  />
                ) : (
                  <Image
                    alt="Agra Surya Energy Logo"
                    src="https://mlnri5rsiwdc.i.optimole.com/w:200/h:49/q:mauto/f:avif/https://www.agrasuryaenergy.com/wp-content/uploads/2021/02/logo-agra-black.png"
                    layout="fill"
                  />
                )} */}
                {/* <h1 className="text-xl font-bold">Agra</h1> */}
              </Link>
            </div>
          </div>
          <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:block">
            {routes.map((route, i) => (
              <Button asChild variant="ghost" key={i}>
                <Link
                  key={i}
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
