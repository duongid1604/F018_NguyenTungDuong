import { getCurrency } from "@/app/service/currencyApi";
import { CurrencyType } from "@/app/types/currencyType";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListCurrency = createAsyncThunk(
  "products/getListCurrency",
  async () => {
    const data = await getCurrency();
    return data;
  }
);
