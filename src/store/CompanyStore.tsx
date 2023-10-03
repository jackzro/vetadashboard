import { create } from "zustand";

interface CompanyState {
  //   product: Product[];
  //   addProduct: (product: Product) => void;
  //   setProduct: () => void;
}

export const useCompanyStore = create((set) => ({
  company: {},
  isBranch: {
    status: false,
    iotgateway: {},
  },
  setCompany: (company: any) => {
    set((state: any) => ({ company: company }));
  },
  setIsBranch: (status: any) => {
    set((state: any) => ({ isBranch: status }));
  },
  //   product: [{ id: "1", name: "jack" }],
  //   addProduct: (product: Product) =>
  //     set((state) => ({ product: [...state.product, product] })),
  //   setProduct: () => {},
}));
