import Header from "@/_components/Header";
import Sidebar from "@/_components/Side/Sidebar";
import React from "react";

function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="min-h-screen">
        <Sidebar />
      </div>

      <div className="w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default LayoutDashboard;
