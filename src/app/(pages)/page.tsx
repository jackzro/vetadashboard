"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateProduct, useGetProduct } from "@/services/product";
import { useProductStore } from "@/store/ProductStore";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const products = useProductStore((state) => state.product);
  const addProduct = useProductStore((state) => state.addProduct);
  const [cust, setCust] = useState("");
  // const { data, isLoading, isSuccess } = useGetProduct();
  // const { mutate: createProduct } = useCreateProduct();
  const queryClient = useQueryClient();

  useEffect(() => {
    redirect("/dashboard");
  }, []);

  // const handleAdd = (e: any) => {
  //   e.preventDefault();
  //   if (cust !== "") {
  //     createProduct(
  //       {
  //         name: cust,
  //       },
  //       {
  //         onSuccess: (data) => {
  //           queryClient.invalidateQueries(["products"]);
  //           console.log(data);
  //         },
  //         onError: (err) => {
  //           console.log(err);
  //         },
  //       }
  //     );
  //   }
  // };

  return (
    <main>
      {/* {products.map((data) => (
        <div key={data.id}>{data.name}</div>
      ))} */}
      {/* {isLoading === false &&
        data.map((detail: Product) => <div key={detail.id}>{detail.name}</div>)} */}
      {/* {isSuccess &&
        data?.pages.map((page: any) => {
          console.log(page);
        })} */}

      {/* <form>
        <Input onChange={(e) => setCust(e.target.value)} />
        <Button onClick={handleAdd}>Click Me</Button>
      </form> */}

      {/* <Link href={"/map"}> go to</Link> */}
    </main>
  );
}
