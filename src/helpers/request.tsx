import { authOptions } from "@/utils/authOptions";
import axios from "axios";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";

// export const API_BASE_URL = process.env.NEXT_PUBLIC_URL;
export const API_BASE_URL = process.env.NEXT_PUBLIC_SOLAR_API;

const ApiClient = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  let lastSession: Session | null = null;

  // const now = new Date();
  const now = Math.floor(new Date().getTime() / 1000.0);
  // const onehourbefore = Math.floor(
  //   new Date(now.getTime() - 1 * 60 * 60 * 1000).getTime() / 1000.0
  // );

  instance.interceptors.request.use(
    async (request) => {
      const session = await getSession();
      lastSession = session;

      //@ts-ignore
      if (lastSession == null || now > lastSession.user.exp) {
        signOut();
        request.headers.Authorization = undefined;
        //@ts-ignore
      }

      //@ts-ignore
      if (lastSession || now < lastSession.user.exp) {
        //@ts-ignore
        const accessToken = lastSession?.token?.accessToken;
        // //@ts-ignore
        // const refreshToken = lastSession?.token?.refreshToken;
        request.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      // else {
      //   request.headers.Authorization = undefined;
      // }

      return request;
    },
    (error) => {
      console.error(`API Error: `, error);
      throw error;
    }
  );
  return instance;
};

export default ApiClient();

// const createClientAPI = () => {
//   const api = axios.create({
//     baseURL: API_BASE_URL,
//   });
//   return api;
// };

// export default createClientAPI();
