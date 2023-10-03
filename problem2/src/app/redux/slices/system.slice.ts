import { CurrencyType, SystemStateStype } from "@/app/types/currencyType";
import { createSlice } from "@reduxjs/toolkit";
import { getListCurrency } from "../thunks/currency.thunk";

const initialState: SystemStateStype = {
  loading: false,
  error: "",
  isModalOpen: false,
  listCurrency: [],
  isFirstCurrencyClicked: false,
  isSecondCurrencyClicked: false,
  firstCurrency: {
    currency: "ETH",
    date: "2023-08-29T07:10:52.000Z",
    price: 1645.9337373737374,
  },
  secondCurrency: {
    currency: "USDC",
    date: "023-08-29T07:10:30.000Z",
    price: 1,
  },
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    toggleFirstCurrencyClicked: (state, action) => {
      state.isFirstCurrencyClicked = action.payload;
    },
    toggleSecondCurrencyClicked: (state, action) => {
      state.isSecondCurrencyClicked = action.payload;
    },
    updateFirstCurrencyData: (state, action) => {
      state.firstCurrency = action.payload;
    },
    updateSecondCurrencyData: (state, action) => {
      state.secondCurrency = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getListCurrency.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getListCurrency.fulfilled, (state, action) => {
      state.loading = false;
      state.listCurrency = action.payload;
      state.error = "";
    });
    builder.addCase(getListCurrency.rejected, (state, action) => {
      state.loading = false;
      state.listCurrency = [];
      state.error = action.error.message;
    });
  },
});

export const {
  toggleModal,
  toggleFirstCurrencyClicked,
  toggleSecondCurrencyClicked,
  updateFirstCurrencyData,
  updateSecondCurrencyData,
} = systemSlice.actions;

export default systemSlice.reducer;
