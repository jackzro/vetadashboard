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

  React.useEffect(() => {
    if (isLoading === false) {
      setCompanies(company);
    }
  }, [company]);

  return (
    <main className="flex h-screen">
      {isLoading === false && (
        <>
          <Sidebar company={company} />
          {isBranch?.status === false ? (
            <MainSide />
          ) : (
            <BranchSide iotgateway={isBranch?.iotgateway} />
          )}
        </>
      )}
    </main>
  );
}

export default Dashboard;
