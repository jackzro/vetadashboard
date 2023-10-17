"use client";

import React from "react";
import SideList from "./SideList";
import Image from "next/image";
import Link from "next/link";
import { useGetCompany } from "@/services/company";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function Sidebar({ type }: any) {
  const { data: company, isLoading } = useGetCompany();
  const [isSelected, setIsSelected] = React.useState({
    company: "",
    branch: "",
  });

  return (
    <div className="sm:bg-abu sm:dark:bg-gray-700 sm:px-3 sm:py-5 md:w-[287px] sm:flex flex-col items-center h-full">
      <div className="sm:block h-[60px] w-[180px] hidden">
        <Link href="/dashboard">
          <Image
            alt="Veta Logo"
            src="/img/logo-veta.png"
            width={100}
            height={100}
            // src="https://veta.co.id/wp-content/uploads/2023/06/3@4x-8-2048x825.png"
            layout="responsive"
          />
        </Link>
      </div>

      {isLoading === false ? (
        type !== "header" ? (
          <div className="sm:flex flex-col pt-6 px-2 h-screen hidden space-y-4">
            {company.map((pt: any) => (
              <SideList
                pt={pt}
                key={pt.company}
                setIsSelected={setIsSelected}
                isSelected={isSelected}
              />
            ))}
          </div>
        ) : (
          <div className="sm:flex flex-col pt-6 px-2 h-screen space-y-4">
            {company.map((pt: any) => (
              <SideList
                pt={pt}
                key={pt.company}
                setIsSelected={setIsSelected}
                isSelected={isSelected}
              />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}

export default Sidebar;
