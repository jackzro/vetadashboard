import { useQuery, useMutation } from "@tanstack/react-query";
import request from "../helpers/request";
import type { NextApiRequest, NextApiResponse } from "next";

type method = "put" | "post" | "delete";

const getRequest = async (
  endpoint: string,
  params: Object
  //   response: NextApiResponse
) => {
  try {
    const { data: response } = await request.get(endpoint, { params });
    return response;
  } catch (error) {
    throw error;
    // throw error?.response?.data || {};
  }
};

const postRequest = async (
  endpoint: string,
  body: any,
  isFormData = false,
  method: method
) => {
  let payload = body;
  if (isFormData) {
    payload = new FormData();
    Object.keys(body).forEach((key: string) => {
      payload.append(key, body[key]);
    });
  }
  try {
    const { data: response } = await request[method](endpoint, payload);
    return response;
  } catch (error) {
    // throw error?.response?.data || {};
  }
};

export const getAllProduct = () => getRequest("/customer", {});
export const useGetProduct = () =>
  useQuery({ queryFn: getAllProduct, queryKey: ["products"] });

export const postCreateProduct = (body: any) =>
  postRequest(`/customer`, body, false, "post");
export const useCreateProduct = () => useMutation(postCreateProduct);
