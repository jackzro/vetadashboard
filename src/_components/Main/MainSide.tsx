import { useCompanyStore } from "@/store/CompanyStore";
import { SigmaSquare, Split, Sunrise, UtilityPole } from "lucide-react";
import React from "react";
import Card from "../Card";
import MapGoogle from "../MapComponent/GoogleMap";

const options: any = { month: "short", day: "numeric" };
const month = new Date().toLocaleDateString("en-GB", options);

function MainSide() {
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
          <div className="grid md:grid md:grid-cols-2 md: grid-rows-2 gap-2 px-4 py-4">
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
          <div>
            <MapGoogle data={generatePosition()} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MainSide;
