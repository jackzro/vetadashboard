import { useQuery, useMutation } from "@tanstack/react-query";
import request from "../helpers/request";
import type { NextApiRequest, NextApiResponse } from "next";

type method = "put" | "post" | "delete";

const getRequest = async (
  endpoint: string,
  params: Object
  // response: NextApiResponse
) => {
  try {
    const { data: response } = await request.get(endpoint, { params });
    return response;
  } catch (error) {
    throw error;
    // throw error?.response?.data || {};
  }
};

const downloadGetRequest = async (
  endpoint: string,
  params: Object
  //   response: NextApiResponse
) => {
  try {
    const { data: response } = await request.get(endpoint, {
      params,
      responseType: "blob",
    });
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

export const getCompany = () =>
  getRequest("/v1/sensor-hub/company-branch-gateway-info/", {});
export const useGetCompany = () =>
  useQuery({
    queryFn: getCompany,
    queryKey: ["company"],
  });

export const getBilling = (
  serial_number: string,
  month: string,
  year: string
) =>
  getRequest(
    `/v1/billing/energy-usage/?page_size=1000&serial_number=${serial_number}&month=${month}&year=${year}`,
    {}
  );

export const useGetBilling = (
  serial_number: string,
  month: string,
  year: string
) =>
  useQuery({
    queryFn: () => getBilling(serial_number, month, year),
    queryKey: ["billing", serial_number, month, year],
    retry: false,
  });

export const getGenerateInvoice = (
  serial_number: string,
  month: string,
  year: string
) =>
  downloadGetRequest(
    `/v1/billing/generate-invoice-excel/?serial_number=${serial_number}&month=${month}&year=${year}`,
    {}
  );

export const useGenerateInvoice = (
  serial_number: string,
  month: string,
  year: string
) =>
  useQuery({
    queryFn: () => getGenerateInvoice(serial_number, month, year),
    queryKey: ["invoice", serial_number, month, year],
    enabled: false,
    staleTime: Infinity,
  });
