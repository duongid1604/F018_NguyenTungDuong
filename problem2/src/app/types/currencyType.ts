export interface CurrencyType {
  currency: string;
  date: string;
  price: number;
}

export interface SystemStateStype {
  loading: boolean;
  error?: string;
  isModalOpen: boolean;
  listCurrency: CurrencyType[];
  isFirstCurrencyClicked: boolean;
  isSecondCurrencyClicked: boolean;
  firstCurrency: CurrencyType;
  secondCurrency: CurrencyType;
}
