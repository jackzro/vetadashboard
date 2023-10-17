"use client";

import {
  Building2,
  ChevronsUpDown,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useCompanyStore } from "@/store/CompanyStore";
import { useQueryClient } from "@tanstack/react-query";

function SideList({ pt, setIsSelected, isSelected }: any) {
  const [isOpen, setIsOpen] = React.useState(false);

  const setCompany = useCompanyStore((state: any) => state.setCompany);
  const setIsBranch = useCompanyStore((state: any) => state.setIsBranch);

  const setMainPage = () => {
    setIsSelected((prev: any) => ({
      ...prev,
      company: pt.company,
      branch: "",
    }));
    setCompany(pt);
    setIsBranch({
      status: false,
      iotgateway: {},
    });
  };

  const setBranchPage = (data: any) => {
    setIsSelected((prev: any) => ({ ...prev, branch: data.company_branch }));
    setIsBranch({
      status: true,
      iotgateway: data.iot_gateway[0],
    });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center">
        <div className="w-[100%]">
          <CollapsibleTrigger asChild className="min-w-full">
            <div
              className={`flex space-x-2 items-center${
                isSelected.company === pt.company
                  ? "font-semibold bg-veta px-[9px] py-[15px] rounded-[10px]"
                  : null
              }`}
            >
              <span className="flex items-center">
                <span>
                  <Building2 className="h-5 w-5" />
                </span>
              </span>
              <span>
                <h4
                  className={`text-sm font-normal cursor-pointer  ${
                    isSelected.company === pt.company
                      ? "text-white"
                      : "text-black"
                  }`}
                  onClick={setMainPage}
                >
                  {pt.company}
                </h4>
              </span>
            </div>
            {/* <Button>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle</span>
            </Button> */}
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="space-y-2">
        <ul className="ml-10 list-none cursor-pointer ">
          {pt.branches_list.map((data: any) => (
            <li
              className={`text-sm flex space-x-2 ${
                isSelected.branch === data.company_branch
                  ? "font-semibold italic underline rounded-lg mb-2 "
                  : null
              }`}
              onClick={() => setBranchPage(data)}
              key={data.company_branch}
            >
              {/* <Building2 className="h-4 w-4 text-black dark:text-white" /> */}
              <p>{data.company_branch}</p>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default SideList;
