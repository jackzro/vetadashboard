"use client";

import React from "react";
import SideList from "./SideList";

function Sidebar({ company, type }: any) {
  const [isSelected, setIsSelected] = React.useState("");

  return (
    <>
      {type !== "header" ? (
        <div className="md:flex flex-col border-r-4 py-2 pr-10 h-screen w-[25%] hidden">
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
        <>
          {company.map((pt: any) => (
            <SideList
              pt={pt}
              key={pt.company}
              setIsSelected={setIsSelected}
              isSelected={isSelected}
            />
          ))}
        </>
      )}
    </>
  );
}

export default Sidebar;
