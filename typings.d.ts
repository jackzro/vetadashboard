interface Product {
  id: string;
  name: string;
}

interface Energy {
  acrel_total_active_energy_export: string;
  acrel_total_active_energy_import: string;
  schneider_total_active_energy_export: string;
  schneider_total_active_energy_import: string;
  serial_number: string;
  timestamp: number;
}
