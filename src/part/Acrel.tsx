import React from "react";
import CustomCard from "@/_components/CustomCard";
import { Sunrise, Activity, UtilityPole } from "lucide-react";
import Image from "next/legacy/image";
import { energyFormula, voltageFormula } from "@/helpers/formula";

function Acrel({ data }: { data: Energy }) {
  return (
    <div>
      <div className="w-full flex items-center justify-center mb-4 text-5xl">
        Acrel
      </div>

      <CustomCard
        title="Energy"
        value={{
          "Active Energy Import": energyFormula(
            data.acrel_total_active_energy_import
          ),
          "Active Energy Export": energyFormula(
            data.acrel_total_active_energy_export
          ),
          // "Reactive Energy Import": energyFormula(
          //   data.acrel_forward_reactive_total_energy
          // ),
          // "Reactive Energy Export": energyFormula(
          //   data.acrel_reversing_reactive_total_energy
          // ),
        }}
      >
        <Sunrise className="h-8 w-8" />
      </CustomCard>
      {/* <CustomCard
        title="Voltage"
        value={{
          "Voltage Phase 1": voltageFormula(data.acrel_voltage_phase_1),
          "Voltage Phase 2": voltageFormula(data.acrel_voltage_phase_2),
          "Voltage Phase 3": voltageFormula(data.acrel_voltage_phase_3),
        }}
      >
        <UtilityPole className="h-8 w-8" />
      </CustomCard>
      <CustomCard
        title="Current"
        value={{
          "Current Phase 1": energyFormula(data.acrel_current_phase_1),
          "Current Phase 2": energyFormula(data.acrel_current_phase_2),
          "Current Phase 3": energyFormula(data.acrel_current_phase_3),
        }}
      >
        <Activity className="h-8 w-8" />
      </CustomCard> */}
    </div>
  );
}

export default Acrel;
