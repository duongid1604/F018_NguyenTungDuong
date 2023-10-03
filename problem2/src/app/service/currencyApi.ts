import { CurrencyType } from "../types/currencyType";
import AxiosClient from "./axiosClient";

export const getCurrency = async (): Promise<CurrencyType[]> => {
  const response = await AxiosClient.get("");
  return response.data;
};
