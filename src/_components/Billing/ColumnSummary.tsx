"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type EnergySummary = {
  first_month_pv_energy_data: 556271.174;
  last_month_pv_energy_data: 719563.489;
  total_pv_energy_usage: 163292.315;
  total_pv_usage_in_hours: 814.8;
  first_month_grid_energy_data: 36298.8;
  last_month_grid_energy_data: 47736.6;
  total_grid_energy_usage: 11437.8;
  grand_total_energy_usage: 174730.115;
};

export const columnsSummary: ColumnDef<EnergySummary>[] = [
  {
    accessorKey: "total_pv_energy_usage",
    header: "Total PV Usage",
    cell: ({ row }) => {
      return `${row.getValue("total_pv_energy_usage")} kWh`;
    },
  },
  {
    accessorKey: "beginning_of_the_month_pv_energy_data",
    header: "Begin of Month PV",
    cell: ({ row }) => {
      return `${row.getValue("beginning_of_the_month_pv_energy_data")} kWh`;
    },
  },

  {
    accessorKey: "end_of_month_pv_energy_data",
    header: "End of Month PV",
    cell: ({ row }) => {
      return `${row.getValue("end_of_month_pv_energy_data")} kWh`;
    },
  },
  {
    accessorKey: "total_pv_usage_in_hours",
    header: "usage/h",
    cell: ({ row }) => {
      return `${row.getValue("total_pv_usage_in_hours")} kWh`;
    },
  },
];
