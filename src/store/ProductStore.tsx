import { create } from "zustand";

interface ProductState {
  product: Product[];
  addProduct: (product: Product) => void;
  setProduct: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  product: [{ id: "1", name: "jack" }],
  addProduct: (product: Product) =>
    set((state) => ({ product: [...state.product, product] })),
  setProduct: () => {},
}));
