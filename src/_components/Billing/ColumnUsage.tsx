"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type EnergyUsage = {
  pv_energy_usage: number;
  pv_usage_in_hours: number;
  grid_energy_usage: number;
  datetime: string;
  total_energy_usage: number;
};

export const columnsUsage: ColumnDef<EnergyUsage>[] = [
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
    accessorKey: "pv_energy_usage",
    header: "PV Usage",
    cell: ({ row }) => {
      return `${row.getValue("pv_energy_usage")} kWh`;
    },
  },
  {
    accessorKey: "pv_usage_in_hours",
    header: "pv/h",
    cell: ({ row }) => {
      return `${row.getValue("pv_usage_in_hours")} h`;
    },
  },
  {
    accessorKey: "grid_energy_usage",
    header: "Grid usage",
    cell: ({ row }) => {
      return `${row.getValue("grid_energy_usage")} kWh`;
    },
  },
  {
    accessorKey: "total_energy_usage",
    header: "Total Energy",
    cell: ({ row }) => {
      return `${row.getValue("total_energy_usage")} kWh`;
    },
  },
];
