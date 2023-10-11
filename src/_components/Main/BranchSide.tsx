"use client";

import { Button } from "@/components/ui/button";
import { CalDate } from "@/components/ui/caldate";
import { useGenerateInvoice, useGetBilling } from "@/services/company";
import { Cable, Receipt, Sunrise } from "lucide-react";
import React from "react";
import { columns } from "../Billing/Column";
import { columnsSummary } from "../Billing/ColumnSummary";
import { columnsSummaryGrid } from "../Billing/ColumnSummaryGrid";
import { columnsUsage } from "../Billing/ColumnUsage";
import { DataTable } from "../Billing/DataTable";
import { ComboboxTypeEnergyView } from "../DropDownMenu/TableMenu";

function BranchSide({ iotgateway }: any) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [type, setType] = React.useState("energy captured");
  const [month, setmonth] = React.useState(
    (new Date().getMonth() + 1).toString()
  );
  const [year, setyear] = React.useState(new Date().getFullYear().toString());
  const { data, isLoading, refetch } = useGetBilling(
    iotgateway.serial_number,
    month,
    year
  );

  const { refetch: download } = useGenerateInvoice(
    iotgateway.serial_number,
    month,
    year
  );

  const calculateTotal = () => {
    const total = data["energy_usage_summary"]["grand_total_energy_usage"];
    return total;
  };

  const handleBillingByDate = (date: any) => {
    setDate(date);
    const month = (new Date(date).getMonth() + 1).toString();
    const year = new Date(date).getFullYear().toString();
    setmonth(month);
    setyear(year);
    refetch();
  };

  const downloadInvoice = async () => {
    const excelFile: any = await download();

    if (excelFile) {
      const href = URL.createObjectURL(excelFile.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute(
        "download",
        `${data.serial_number}-[${data.month}-${data.year}].xlsx`
      ); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
  };
  return (
    <div className="container mx-auto py-2">
      {isLoading === false && data !== undefined ? (
        <>
          <div className="py-2 flex flex-col sm:flex-row justify-between ">
            <div className="space-y-2">
              <span>
                <p> ID Gateway : </p>
                <p>{data.serial_number}</p>
              </span>
              <span>
                <p>Select Billing Month : </p>
                <CalDate
                  className="border-4 rounded-lg text-sm"
                  showMonthYearPicker
                  selected={date}
                  dateFormat="MM/yyyy"
                  onChange={handleBillingByDate}
                />
              </span>
              <span>
                {data["daily_energy_usage"].length !== 0 ? (
                  <Button onClick={downloadInvoice}>Download</Button>
                ) : null}
              </span>
            </div>

            <div className="space-y-2">
              <span className="flex items-center space-x-2">
                <Sunrise className="h-6 w-6" />
                <p> Total: {calculateTotal()} kWh</p>
              </span>

              <span className="flex items-center space-x-2">
                <Receipt className="h-6 w-6" />
                <p>
                  Bill Time : {data.month}-{data.year}
                </p>
              </span>
              <span className="flex items-center space-x-2">
                <Cable className="w-6 h-6" />
                <p> PLTS Capacity : {data.plts_capacity} kWh</p>
              </span>
              <span>
                <ComboboxTypeEnergyView value={type} setValue={setType} />
              </span>
            </div>
          </div>
          {type === "energy captured" || type === "energy usage" ? (
            <DataTable
              columns={type === "energy captured" ? columns : columnsUsage}
              data={
                type === "energy captured"
                  ? data["daily_energy_data_captured"]
                  : data["daily_energy_usage"]
              }
            />
          ) : (
            <>
              <p className="py-2">
                Total Energy: &nbsp;
                {data["energy_usage_summary"]["grand_total_energy_usage"]} kWh
              </p>
              <DataTable
                columns={columnsSummary}
                data={[data["energy_usage_summary"]]}
              />
              <DataTable
                columns={columnsSummaryGrid}
                data={[data["energy_usage_summary"]]}
              />
            </>
          )}
        </>
      ) : (
        <div>Belum ada Data </div>
      )}
    </div>
  );
}

export default BranchSide;
