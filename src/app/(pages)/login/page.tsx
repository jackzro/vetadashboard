"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import Image from "next/image";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: session, status } = useSession();
  const [disable, setDisable] = React.useState(false);
  const router = useRouter();

  const login = async (data: any, e: any) => {
    e.preventDefault();
    try {
      router.push("/dashboard/chart");
      // const res = await signIn("credentials", {
      //   email: data.email,
      //   password: data.password,
      //   redirect: false,
      //   // callbackUrl: "/dashboard",
      // });

      // //@ts-ignore
      // if (res?.error !== null) {
      //   toast.error("Incorrect Login Details!!");
      // } else {
      //   toast.success("Login Successful!!");
      //   router.push("/dashboard");
      //   setDisable(false);
      // }
    } catch (error: any) {
      toast.error(error);
      return error;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-400 to-gray-700">
      <form
        onSubmit={handleSubmit(login)}
        className="flex flex-col p-4 rounded-md items-center justify-center md:w-[30%] w-[50%] bg-slate-200"
      >
        <div className="w-[100px]">
          <Image
            alt="Veta Logo"
            // src="/img/veta.png"
            src="https://veta.co.id/wp-content/uploads/2023/06/3@4x-8-2048x825.png"
            width={100}
            height={100}
          />
        </div>

        <span className="text-sm flex flex-col items-center justify-center p-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-yellow-600">
          <label>Empowering Change Through </label>
          <p>Green Technology</p>
        </span>

        <span className="min-w-full space-y-2 py-2">
          <label>Username : </label>
          <Input {...register("email")} type="text" placeholder="Email" />
        </span>

        <span className="min-w-full space-y-2 py-2">
          <label>Password : </label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </span>

        <Button type="submit" className="min-w-full mt-4" disabled={disable}>
          <p>Login</p>
          <LogIn className="h-6 w-6 ml-2" />
        </Button>
      </form>
    </div>
  );
}

export default Login;
