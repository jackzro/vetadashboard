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
  Selected: {
    pt: "",
    branch: "",
  },

  setCompanies: (companies: any) =>
    set((state: any) => ({ companies: [...state.companies, companies] })),
  setCompany: (company: any) => {
    set((state: any) => ({ company: company }));
  },
  setIsBranch: (status: any) => {
    set((state: any) => ({ isBranch: status }));
  },
  updatePT: ({ pt }: any) => {
    set((state: any) => ({ Selected: { ...state.Selected, pt: pt } }));
  },
  updateBranch: ({ branch }: any) => {
    set((state: any) => ({ Selected: { ...state.Selected, branch: branch } }));
  },
}));
