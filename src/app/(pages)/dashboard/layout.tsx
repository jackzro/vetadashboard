import Header from "@/_components/Header";
import React from "react";

function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default LayoutDashboard;
