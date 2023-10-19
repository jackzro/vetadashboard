"use client";

import React from "react";
import Sidebar from "@/_components/Side/Sidebar";
import MainSide from "@/_components/Main/MainSide";
import { useGetCompany } from "@/services/company";
import { useCompanyStore } from "@/store/CompanyStore";
import BranchSide from "@/_components/Main/BranchSide";

function Dashboard() {
  const { data: company, isLoading } = useGetCompany();
  const isBranch = useCompanyStore((state: any) => state.isBranch);
  const setCompanies = useCompanyStore((state: any) => state.setCompanies);
  const Selected = useCompanyStore((state: any) => state.Selected);

  React.useEffect(() => {
    if (isLoading === false) {
      setCompanies(company);
    }
  }, [company, isLoading, setCompanies]);

  return (
    <main className="flex">
      {isLoading === false && (
        <>
          {/* <Sidebar company={company} /> */}
          {isBranch?.status === false ? (
            <MainSide pt={Selected.pt} />
          ) : (
            <BranchSide iotgateway={isBranch?.iotgateway} selected={Selected} />
          )}
        </>
      )}
    </main>
  );
}

export default Dashboard;
