import { create } from "zustand";

interface CompanyState {
  //   product: Product[];
  //   addProduct: (product: Product) => void;
  //   setProduct: () => void;
}

export const useCompanyStore = create((set) => ({
  companies: [],
  company: {},
  isBranch: {
    status: false,
    iotgateway: {},
  },

  setCompanies: (companies: any) =>
    set((state: any) => ({ companies: [...state.companies, companies] })),
  setCompany: (company: any) => {
    set((state: any) => ({ company: company }));
  },
  setIsBranch: (status: any) => {
    set((state: any) => ({ isBranch: status }));
  },
}));
