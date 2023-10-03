"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type Billing = {
  pv_energy_data: number;
  datetime: string;
  grid_energy_data: number;
  timestamp: number;
};

export const columns: ColumnDef<Billing>[] = [
  {
    accessorKey: "datetime",
    header: "Date",
    cell: ({ row }) => {
      const value: any = row.getValue("datetime");
      const dateOnly = new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return `${dateOnly}`;
    },
  },
  {
    accessorKey: "pv_energy_data",
    header: "PV Energy",
    cell: ({ row }) => {
      return `${row.getValue("pv_energy_data")} kWh`;
    },
  },
  {
    accessorKey: "grid_energy_data",
    header: "Grid Energy",
    cell: ({ row }) => {
      return `${row.getValue("grid_energy_data")} kWh`;
    },
  },
  //   {
  //     accessorKey: "amount",
  //     header: "Amount",
  //   },
];
