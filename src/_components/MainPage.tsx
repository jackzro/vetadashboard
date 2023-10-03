"use client";

import Acrel from "@/part/Acrel";
import Schneider from "@/part/Schneider";
import { useGetEnergy, useUpdateHistoryEnergy } from "@/services/energy";
import React, { useState } from "react";

function MainPage() {
  const { data, isLoading, dataUpdatedAt } = useGetEnergy();

  return (
    <div>
      <div className="flex justify-center items-center">
        <p>Time : {new Date(dataUpdatedAt).toLocaleTimeString()}</p>
      </div>

      <div className="lg:grid lg:grid-cols-2">
        {isLoading === false ? (
          <>
            <Schneider data={data.results[0]} />
            <Acrel data={data.results[0]} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MainPage;
