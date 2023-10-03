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

export const getUpdateEnergy = () =>
  getRequest(
    "/v1/sensor-hub/sensor-data/?page_size=1&serial_number=75c710fd-56e5-4f33-bd43-b3da8b18",
    {}
  );
export const useGetEnergy = () =>
  useQuery({
    queryFn: getUpdateEnergy,
    queryKey: ["energy"],
    refetchInterval: 120000,
    refetchIntervalInBackground: true,
  });

export const getGenerateInvoice = (body: any) =>
  getRequest(
    "/v1/billing/generate-invoice-excel/?serial_number=a9b18cce-7f5e-4b38-80b9-5d391d1b&month=9&year=2023",
    {}
  );
export const useGenerateInvoice = () =>
  useQuery({
    queryFn: getGenerateInvoice,
    queryKey: ["invoice"],
  });

export const updateHistoryEnergy = (body: any) => {
  getRequest(
    `/sensor-data?serial_number=sn10230120&timestamp_start=${body.from}&timestamp_end=${body.to}`,
    {}
  );
};

// @ts-ignore
export const useUpdateHistoryEnergy = () => useMutation(updateHistoryEnergy);
