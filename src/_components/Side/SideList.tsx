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
    setIsSelected(pt.company);
    setCompany(pt);
    setIsBranch({
      status: false,
      iotgateway: {},
    });
  };

  const setBranchPage = (data: any) => {
    setIsSelected(data.company_branch);
    setIsBranch({
      status: true,
      iotgateway: data.iot_gateway[0],
    });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center">
        <div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div
          className={`flex space-x-2 ${
            isSelected === pt.company
              ? "font-semibold bg-veta p-2 rounded-lg my-2"
              : null
          }`}
        >
          <span>
            <Building2 className="h-4 w-4" />
          </span>

          <h4
            className={`text-xs cursor-pointer ${
              isSelected === pt.company && "text-white"
            }`}
            onClick={setMainPage}
          >
            {pt.company}
          </h4>
        </div>
      </div>
      <CollapsibleContent className="space-y-2">
        <ul className="ml-10 list-none cursor-pointer ">
          {pt.branches_list.map((data: any) => (
            <li
              className={`text-sm flex space-x-2 ${
                isSelected === data.company_branch
                  ? "font-semibold bg-veta p-2 text-white rounded-lg mb-2 "
                  : null
              }`}
              onClick={() => setBranchPage(data)}
              key={data.company_branch}
            >
              <Building2 className="h-4 w-4 text-black dark:text-white" />
              <p>{data.company_branch}</p>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default SideList;
