"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type EnergySummaryGrid = {
  first_month_pv_energy_data: 556271.174;
  last_month_pv_energy_data: 719563.489;
  total_pv_energy_usage: 163292.315;
  total_pv_usage_in_hours: 814.8;
  first_month_grid_energy_data: 36298.8;
  last_month_grid_energy_data: 47736.6;
  total_grid_energy_usage: 11437.8;
  grand_total_energy_usage: 174730.115;
};

export const columnsSummaryGrid: ColumnDef<EnergySummaryGrid>[] = [
  {
    accessorKey: "beginning_of_the_month_grid_energy_data",
    header: "Begin of Month Grid",
    cell: ({ row }) => {
      return `${row.getValue("beginning_of_the_month_grid_energy_data")} kWh`;
    },
  },

  {
    accessorKey: "end_of_the_month_grid_energy_data",
    header: "End of Month Grid",
    cell: ({ row }) => {
      return `${row.getValue("end_of_the_month_grid_energy_data")} kWh`;
    },
  },
  {
    accessorKey: "total_grid_energy_usage",
    header: "Total Grid",
    cell: ({ row }) => {
      return `${row.getValue("total_grid_energy_usage")} kWh`;
    },
  },
];
