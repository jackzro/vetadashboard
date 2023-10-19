import { useCompanyStore } from "@/store/CompanyStore";
import {
  BuildingIcon,
  SigmaSquare,
  Split,
  Sunrise,
  UtilityPole,
  Home,
} from "lucide-react";
import React from "react";
import Card from "../Card";
import MapGoogle from "../MapComponent/GoogleMap";

const options: any = { month: "short", day: "numeric" };
const month = new Date().toLocaleDateString("en-GB", options);

function MainSide({ pt }: any) {
  const company = useCompanyStore((state: any) => state.company);

  const generatePosition = () => {
    const result = company.branches_list.map((branch: any) => {
      const res = branch.iot_gateway.map((gateway: any) => {
        return {
          id: gateway.serial_number,
          name: branch.company_branch,
          position: {
            lat: gateway.latitude,
            lng: gateway.longitude,
          },
          status: gateway.status,
          connectivity: gateway.connectivity,
          pv_energy_usage: gateway.pv_energy_usage,
          grid_energy_usage: gateway.grid_energy_usage,
          total_energy_usage: gateway.total_energy_usage,
        };
      });

      return res[0];
    });
    return result;
  };

  return (
    <>
      {Object.values(company).length !== 0 ? (
        <div className="w-full">
          <div className="px-8 py-10">
            <span className="text-black text-[34px] font-bold dark:text-white">
              <h4>Dashboard</h4>
            </span>
            <span className="flex flex-col md:flex-row item-center space-x-2 text-gray-400 dark:text-white">
              <span className="flex items-center space-x-2">
                <Home className="h-[20px] w-6" />
                <h1 className="text-2xl">Home </h1>
                <h1 className="text-2xl">/</h1>
              </span>

              <span className="flex items-center text-black dark:text-white space-x-2">
                <BuildingIcon className="h-[20px] w-6" />
                <h1 className="text-2xl text-black dark:text-white">{pt}</h1>
              </span>
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-8 py-8">
            <Card
              value={company.branches_list.length}
              placeholder={"Total Branch"}
              unit={"unit"}
            >
              <Split className="w-12 h-12 " />
            </Card>

            <Card
              value={company.total_pv_energy_usage}
              placeholder={`Total PV 1-${month}`}
              unit={"kWh"}
            >
              <Sunrise className="w-12 h-12 " />
            </Card>

            <Card
              value={company.total_grid_energy_usage}
              placeholder={`Total Grid 1-${month}`}
              unit={"kWh"}
            >
              <UtilityPole className="w-12 h-12 " />
            </Card>

            <Card
              value={company.grand_total_energy_usage}
              placeholder={`Total Energy 1-${month}`}
              unit={"kWh"}
            >
              <SigmaSquare className="w-12 h-12 " />
            </Card>
          </div>
          <div className="px-8">
            <MapGoogle data={generatePosition()} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MainSide;
