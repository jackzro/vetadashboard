import {
  energyFormula,
  SchneiderFormulaCurrentAndVoltage,
  SchneiderFormulaEnergy,
  voltageFormula,
} from "@/helpers/formula";

function convertDataToChart(datas: Energy[]) {
  const activeSchneiderEnergyExport: any = [];
  const activeSchneiderEnergyImport: any = [];
  const activeAcrelEnergyExport: any = [];
  const activeAcrelEnergyImport: any = [];
  const reactiveAcrelEnergyExport: any = [];
  const reactiveAcrelEnergyImport: any = [];
  const reactiveSchneiderEnergyExport: any = [];
  const reactiveSchneiderEnergyImport: any = [];
  const acrelvoltagephase1: any = [];
  const acrelvoltagephase2: any = [];
  const acrelvoltagephase3: any = [];
  const schneidervoltagephase1: any = [];
  const schneidervoltagephase2: any = [];
  const schneidervoltagephase3: any = [];
  const acrelcurrentphase1: any = [];
  const acrelcurrentphase2: any = [];
  const acrelcurrentphase3: any = [];
  const schneidercurrentphase1: any = [];
  const schneidercurrentphase2: any = [];
  const schneidercurrentphase3: any = [];

  const labels: any = [];
  const res = datas.map((data: Energy) => {
    const date: number = data.timestamp;
    const time = new Date(date * 1000);
    const labelTime = `${time.toLocaleDateString()} ${time.toLocaleString(
      "en-US",
      { hour: "numeric", hour12: true }
    )}`;
    activeSchneiderEnergyExport.push(
      SchneiderFormulaEnergy(data.schneider_total_active_energy_export)
    );
    activeSchneiderEnergyImport.push(
      SchneiderFormulaEnergy(data.schneider_total_active_energy_import)
    );
    activeAcrelEnergyExport.push(
      energyFormula(data.acrel_total_active_energy_export)
    );
    activeAcrelEnergyImport.push(
      energyFormula(data.acrel_total_active_energy_import)
    );
    // reactiveAcrelEnergyExport.push(
    //   energyFormula(data.acrel_reversing_reactive_total_energy)
    // );
    // reactiveAcrelEnergyImport.push(
    //   energyFormula(data.acrel_forward_reactive_total_energy)
    // );
    // reactiveSchneiderEnergyExport.push(
    //   SchneiderFormulaEnergy(data.schneider_total_reactive_energy_export)
    // );
    // reactiveSchneiderEnergyImport.push(
    //   SchneiderFormulaEnergy(data.schneider_total_reactive_energy_import)
    // );
    // acrelvoltagephase1.push(voltageFormula(data.acrel_voltage_phase_1));
    // acrelvoltagephase2.push(voltageFormula(data.acrel_voltage_phase_2));
    // acrelvoltagephase3.push(voltageFormula(data.acrel_voltage_phase_3));
    // schneidervoltagephase1.push(
    //   SchneiderFormulaCurrentAndVoltage(data.schneider_voltage_phase_1)
    // );
    // schneidervoltagephase2.push(
    //   SchneiderFormulaCurrentAndVoltage(data.schneider_voltage_phase_2)
    // );
    // schneidervoltagephase3.push(
    //   SchneiderFormulaCurrentAndVoltage(data.schneider_voltage_phase_3)
    // );
    // acrelcurrentphase1.push(energyFormula(data.acrel_current_phase_1));
    // acrelcurrentphase2.push(energyFormula(data.acrel_current_phase_2));
    // acrelcurrentphase3.push(energyFormula(data.acrel_current_phase_3));
    // schneidercurrentphase1.push(
    //   SchneiderFormulaCurrentAndVoltage(data.schneider_current_phase_1)
    // );
    // schneidercurrentphase2.push(
    //   SchneiderFormulaCurrentAndVoltage(data.schneider_current_phase_2)
    // );
    // schneidercurrentphase3.push(
    //   SchneiderFormulaCurrentAndVoltage(data.schneider_current_phase_3)
    // );
    labels.push(labelTime);
  });

  return {
    activeSchneiderEnergyExport,
    labels,
    activeSchneiderEnergyImport,
    activeAcrelEnergyExport,
    activeAcrelEnergyImport,
    // reactiveAcrelEnergyExport,
    // reactiveAcrelEnergyImport,
    // reactiveSchneiderEnergyExport,
    // reactiveSchneiderEnergyImport,
    // acrelvoltagephase1,
    // acrelvoltagephase2,
    // acrelvoltagephase3,
    // schneidervoltagephase1,
    // schneidervoltagephase2,
    // schneidervoltagephase3,
    // acrelcurrentphase1,
    // acrelcurrentphase2,
    // acrelcurrentphase3,
    // schneidercurrentphase1,
    // schneidercurrentphase2,
    // schneidercurrentphase3,
  };
}

export { convertDataToChart };
