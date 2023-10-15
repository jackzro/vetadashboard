"use client";

import { Button } from "@/components/ui/button";
import { CalDate } from "@/components/ui/caldate";
import { useGenerateInvoice, useGetBilling } from "@/services/company";
import { Cable, CalendarDays, Receipt, Sunrise, Zap } from "lucide-react";
import React, { forwardRef } from "react";
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

  const CustomCalenderInput = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <Button
        className="flex items-center justify-center space-x-2"
        onClick={onClick}
        ref={ref}
      >
        <CalendarDays className="h-6 w-6" />
        <span>{value}</span>
      </Button>
    )
  );
  return (
    <div className="container mx-auto py-2 dark:bg-zinc-800">
      {isLoading === false && data !== undefined ? (
        <>
          <div className="py-2 flex flex-col sm:flex-row space-y-6 justify-between">
            <div className="space-y-2 flex flex-col">
              <span className="space-y-2 flex flex-col">
                <span>
                  <p className="text-xl font-bold"> ID Gateway : </p>
                </span>
                <span>
                  <p>{data.serial_number}</p>
                </span>
              </span>
              <span className="space-y-2">
                <span>
                  <p className="text-xl font-bold">Select Billing Month : </p>
                </span>

                <span className="flex space-x-2">
                  <CalDate
                    className="border-2 w-[75%] text-center border-white rounded-xl bg-black text-sm"
                    showMonthYearPicker
                    selected={date}
                    dateFormat="MM/yyyy"
                    onChange={handleBillingByDate}
                    customInput={<CustomCalenderInput />}
                  />
                  {data["daily_energy_usage"].length !== 0 ? (
                    <Button onClick={downloadInvoice} className="bg-veta">
                      Export
                    </Button>
                  ) : null}
                </span>
              </span>
            </div>

            <div className="space-y-2">
              <span className="flex items-center space-x-2 ">
                <Zap className="h-8 w-8 font-bold" />
                <p className="text-xl font-bold"> Total: </p>
                <p>{calculateTotal()} kWh</p>
              </span>

              <span className="flex items-center space-x-2">
                <Receipt className="h-8 w-8 font-bold" />
                <p className="text-xl font-bold">Bill Time :</p>
                <p>
                  {data.month}-{data.year}
                </p>
              </span>
              <span className="flex items-center space-x-2">
                <Cable className="h-8 w-8 font-bold" />
                <p className="text-xl font-bold"> PLTS Capacity : </p>
                <p>{data.plts_capacity} kWh</p>
              </span>
            </div>
          </div>

          <div className="my-10">
            <ComboboxTypeEnergyView value={type} setValue={setType} />
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
              <span className="flex items-center space-x-2 pb-2">
                <p className="font-bold text-xl">Total Energy: </p>
                <p>
                  {data["energy_usage_summary"]["grand_total_energy_usage"]} kWh
                </p>
              </span>

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
