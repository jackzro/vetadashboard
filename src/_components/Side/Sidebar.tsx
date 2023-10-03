"use client";

import React from "react";
import { useGetCompany } from "@/services/company";
import { Building2 } from "lucide-react";
import SideList from "./SideList";

function Sidebar({ company }: any) {
  const [isSelected, setIsSelected] = React.useState("");
  return (
    <div className="sm:flex flex-col border-r-4 py-2 pr-10 h-screen w-[25%] hidden">
      {company.map((pt: any) => (
        <SideList
          pt={pt}
          key={pt.company}
          setIsSelected={setIsSelected}
          isSelected={isSelected}
        />
      ))}
    </div>
  );
}

export default Sidebar;
