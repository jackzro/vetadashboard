"use client";

import { Button } from "@/components/ui/button";
import { CalDate } from "@/components/ui/caldate";
import { useGenerateInvoice, useGetBilling } from "@/services/company";
import { BuildingIcon, Cable, Home, Loader2, Receipt, Zap } from "lucide-react";
import React from "react";
import { columns } from "../Billing/Column";
import { columnsSummary } from "../Billing/ColumnSummary";
import { columnsSummaryGrid } from "../Billing/ColumnSummaryGrid";
import { columnsUsage } from "../Billing/ColumnUsage";
import DataTable from "../Billing/DataTable";
import { ComboboxTypeEnergyView } from "../DropDownMenu/TableMenu";
import CustomInputCalender from "../CustomCalenderInput";
import { useCompanyStore } from "@/store/CompanyStore";

function BranchSide({ iotgateway, selected }: any) {
  const Selected = useCompanyStore((state: any) => state.Selected);
  const setIsBranch = useCompanyStore((state: any) => state.setIsBranch);
  const updateBranch = useCompanyStore((state: any) => state.updateBranch);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [type, setType] = React.useState("energy captured");
  const [month, setmonth] = React.useState(
    (new Date().getMonth() + 1).toString()
  );
  const [year, setyear] = React.useState(new Date().getFullYear().toString());
  const { data, isLoading, refetch, isError } = useGetBilling(
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
          <div className="py-10">
            <span className="text-black text-[32px] font-bold dark:text-white">
              <h4>Energy Data</h4>
            </span>
            <span className="flex flex-col lg:flex-row item-center lg:space-x-2 text-gray-400 dark:text-white cursor-pointer">
              <span
                className="flex items-center space-x-2"
                // onClick={() => router.push("/dashboard/home")}
              >
                <Home className="h-[20px] w-6" />
                <h1 className="text-xl">Home </h1>
                <h1 className="text-xl">/</h1>
              </span>

              <span
                className="flex items-center space-x-2"
                onClick={() => {
                  updateBranch({
                    branch: "",
                  });
                  setIsBranch({
                    status: false,
                    iotgateway: {},
                  });
                }}
              >
                <span>
                  <BuildingIcon className="h-[20px] w-6" />
                </span>
                <h1 className="text-xl">{Selected.pt} </h1>&nbsp;&nbsp;
                <h1 className="text-xl"> /</h1>
              </span>

              <span>
                <h1 className="text-xl text-black dark:text-white">
                  {Selected.branch}
                </h1>
              </span>
            </span>
          </div>
          {/* <div className="py-2 flex flex-col sm:flex-row justify-between space-y-4"> */}
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
            <span className="space-y-2 flex flex-col">
              <span>
                <p className="text-xl font-bold"> ID Gateway : </p>
              </span>
              <span>
                <p className="text-lg font-normal">{data.serial_number}</p>
              </span>
            </span>
            <span className="flex items-center space-x-2 ">
              <Zap className="h-8 w-8 font-bold" />
              <p className="text-xl font-bold"> Total: </p>
              <p className="text-lg font-normal">{calculateTotal()} kWh</p>
            </span>

            <span className="flex items-center space-x-2">
              <Receipt className="h-8 w-8 font-bold" />
              <p className="text-xl font-bold">Bill Time :</p>
              <p className="text-lg font-normal">
                {data.month}-{data.year}
              </p>
            </span>
            <span className="flex items-center space-x-2">
              <Cable className="h-8 w-8 font-bold" />
              <p className="text-xl font-bold"> PLTS Capacity : </p>
              <p className="text-lg font-normal">{data.plts_capacity} kWh</p>
            </span>
          </div>
          {/* </div> */}
          <div className="mt-8 flex flex-col space-y-2">
            <span className="space-y-2">
              <span>
                <p className="text-xl font-bold">Select Billing Month : </p>
              </span>
            </span>
            <span className="flex space-x-2">
              <CalDate
                className="border-2 w-[75%] text-center border-white rounded-xl bg-black text-sm"
                showMonthYearPicker
                selected={date}
                dateFormat="MM/yyyy"
                onChange={handleBillingByDate}
                customInput={<CustomInputCalender />}
              />
              {data["daily_energy_usage"].length !== 0 ? (
                <Button onClick={downloadInvoice} className="bg-veta">
                  Export Billing
                </Button>
              ) : null}
            </span>
          </div>
          <div className="py-3">
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

              <span className="flex flex-col space-y-10">
                <DataTable
                  columns={columnsSummary}
                  data={[data["energy_usage_summary"]]}
                />
                <DataTable
                  columns={columnsSummaryGrid}
                  data={[data["energy_usage_summary"]]}
                />
              </span>
            </>
          )}
        </>
      ) : isError ? (
        <div>Belum ada Data</div>
      ) : (
        <div className="min-w-full h-screen flex justify-center items-center">
          <Loader2 className="h-32 w-32 animate-spin" />
        </div>
      )}
    </div>
  );
}

export default BranchSide;
