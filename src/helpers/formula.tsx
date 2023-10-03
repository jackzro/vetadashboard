export const decimalFormula = (result: any) => {
  const decimalPlaces = 3;
  const p = Math.pow(10, decimalPlaces);
  const n = result * p * (1 + Number.EPSILON);
  const res = Math.round(n) / p;
  return res;
};

export const energyFormula = (value: string) => {
  const result = Number(value);
  const res = decimalFormula(result);
  return String(res);
};

export const voltageFormula = (value: string) => {
  const result = Number(value) * 0.1;
  const res = decimalFormula(result);
  return String(res);
};

export const SchneiderFormulaEnergy = (value: string) => {
  return String(decimalFormula(Number(value)));
};

export const SchneiderFormulaCurrentAndVoltage = (value: string) => {
  return String(decimalFormula(Number(value)));
};
