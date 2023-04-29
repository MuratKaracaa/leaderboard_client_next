import axios, { AxiosResponse } from "axios";

import { removeCookie } from "@/common/utils/cookie";
import { deleteFromStore } from "@/common/utils/localStorage";

const baseURL = ""; //gateway url

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { statusCode } = error.response.data;
    if (statusCode === 401 || statusCode === 403) {
      removeCookie("AUTH_TOKEN");
      deleteFromStore("AUTH_TOKEN");
    }
  }
);

export const getRequest = <ResponseModel>(
  url: string,
  token?: string
): Promise<AxiosResponse<ResponseModel>> => {
  return axiosInstance.get(`${url}`, {
    headers: {
      ...(!!token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });
};

export const postRequest = <ResponseModel, RequestModel>(
  url: string,
  body: RequestModel,
  token?: string
): Promise<AxiosResponse<ResponseModel>> => {
  return axiosInstance.post(`${url}`, body, {
    headers: {
      ...(!!token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });
};
