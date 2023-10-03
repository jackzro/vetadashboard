import CustomCard from "@/_components/CustomCard";
import React from "react";
import { Sunrise, Activity, UtilityPole } from "lucide-react";
import {
  decimalFormula,
  SchneiderFormulaCurrentAndVoltage,
  SchneiderFormulaEnergy,
} from "@/helpers/formula";

function Schneider({ data }: any) {
  return (
    <div>
      <div className="w-full flex items-center justify-center  mb-4 text-5xl">
        Schneider
      </div>

      <CustomCard
        title="Energy"
        value={{
          "Active Energy Import": SchneiderFormulaEnergy(
            data.schneider_total_active_energy_import
          ),
          "Active Energy Export": SchneiderFormulaEnergy(
            data.schneider_total_active_energy_export
          ),
          // "Reactive Energy Import": SchneiderFormulaEnergy(
          //   data.schneider_total_reactive_energy_import
          // ),
          // "Reactive Energy Export": SchneiderFormulaEnergy(
          //   data.schneider_total_reactive_energy_export
          // ),
        }}
      >
        <Sunrise className="h-8 w-8" />
      </CustomCard>

      {/* <CustomCard
        title="Voltage"
        value={{
          "Voltage Phase 1": SchneiderFormulaCurrentAndVoltage(
            data.schneider_voltage_phase_1
          ),
          "Voltage Phase 2": SchneiderFormulaCurrentAndVoltage(
            data.schneider_voltage_phase_2
          ),
          "Voltage Phase 3": SchneiderFormulaCurrentAndVoltage(
            data.schneider_voltage_phase_3
          ),
        }}
      >
        <UtilityPole className="h-8 w-8" />
      </CustomCard>
      <CustomCard
        title="Current"
        value={{
          "Current Phase 1": SchneiderFormulaCurrentAndVoltage(
            data.schneider_current_phase_1
          ),
          "Current Phase 2": SchneiderFormulaCurrentAndVoltage(
            data.schneider_current_phase_2
          ),
          "Current Phase 3": SchneiderFormulaCurrentAndVoltage(
            data.schneider_current_phase_3
          ),
        }}
      >
        <Activity className="h-8 w-8" />
      </CustomCard> */}
    </div>
  );
}

export default Schneider;
