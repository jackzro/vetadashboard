"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPool } from "@/utils/userPool";
import React from "react";
import { useForm } from "react-hook-form";
import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";

function Verification() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const userData = {
    Username: "su_jackson99@yahoo.com",
    Pool: UserPool,
  };

  const cognitoUser = new CognitoUser(userData);

  const onSubmit = (data: any) => {
    const { code } = data;

    cognitoUser.confirmRegistration(code, true, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("call result: " + res);
    });
  };

  const reSend = () => {
    cognitoUser.resendConfirmationCode((err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("call result: " + res);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("code")}
          type="text"
          placeholder="Input Your Code"
        />

        <Button type="submit">Submit</Button>
      </form>

      <Button type="button" onClick={reSend}>
        Resend
      </Button>
    </div>
  );
}

export default Verification;
