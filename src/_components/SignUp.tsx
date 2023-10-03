"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPool } from "@/utils/userPool";
import React from "react";
import { useForm } from "react-hook-form";
import {
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
// import { signIn, signOut, useSession } from "next-auth/react";

function SignUp() {
  // const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    let attributeList = [];
    const gende = {
      Name: "gender",
      Value: "man",
    };
    const nam = {
      Name: "name",
      Value: "jack",
    };
    const attributegende = new CognitoUserAttribute(gende);
    const attributeName = new CognitoUserAttribute(nam);
    attributeList.push(attributegende);
    attributeList.push(attributeName);
    const { email, password, name, gender } = data;
    UserPool.signUp(email, password, attributeList, [], (err, data) => {
      console.log(err, data);
    });
  };

  const login = (data: any) => {
    const { email, password, name, gender } = data;
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: email,
      Pool: UserPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (res) => {
        console.log(res);
      },
      onFailure: (err) => {
        console.log(err);
      },
    });
  };

  // if (session) {
  //   return (
  //     <>
  //       {session?.user?.name} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );

  return (
    <div>
      SignUp
      <form onSubmit={handleSubmit(login)}>
        <Input {...register("email")} type="text" placeholder="Email" />
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        <Input {...register("name")} type="text" placeholder="Name" />
        <Input {...register("gender")} type="text" placeholder="Gender" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default SignUp;
