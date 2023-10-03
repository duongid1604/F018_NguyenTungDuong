import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import {
  toggleFirstCurrencyClicked,
  toggleModal,
  toggleSecondCurrencyClicked,
  updateFirstCurrencyData,
  updateSecondCurrencyData,
} from "@/app/redux/slices/system.slice";
import { CurrencyType } from "@/app/types/currencyType";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";

function SelectCurrencyModal() {
  const dispatch = useAppDispatch();
  const { listCurrency, isFirstCurrencyClicked } = useAppSelector(
    (state) => state.system
  );

  const [searchedData, setSearchedData] =
    useState<CurrencyType[]>(listCurrency);

  const onClose = () => {
    dispatch(toggleModal());
    dispatch(toggleFirstCurrencyClicked(false));
    dispatch(toggleSecondCurrencyClicked(false));
  };

  const handleCoinFieldClicked = (currency: CurrencyType) => {
    isFirstCurrencyClicked
      ? dispatch(updateFirstCurrencyData(currency))
      : dispatch(updateSecondCurrencyData(currency));

    dispatch(toggleModal());

    dispatch(toggleFirstCurrencyClicked(false));
    dispatch(toggleSecondCurrencyClicked(false));
  };

  const CustomCoinField = ({ currency }: { currency: CurrencyType }) => {
    return (
      <div
        className={styles.coinFieldContainer}
        onClick={() => handleCoinFieldClicked(currency)}
      >
        <img src={`${currency.currency}.svg`} />

        <div className={styles.nameContainer}>
          <p className={styles.title}>{currency.currency}</p>
          <p className={styles.desc}>{currency.currency}</p>
        </div>
      </div>
    );
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const lowerCaseQuery = event.target.value.toLowerCase();

    const finalData = listCurrency.filter((item) => {
      if (typeof item.currency === "string") {
        return item.currency.toLowerCase().includes(lowerCaseQuery);
      }
    });

    setSearchedData(finalData);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.header}>
        <p>Select a token</p>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.searchField}>
        <SearchIcon />
        <input
          type="text"
          placeholder="Search name or paste an address"
          onChange={(event) => handleSearch(event)}
          autoFocus
        />
      </div>
      <div className={styles.listToken}>
        {searchedData.map((currency) => (
          <CustomCoinField
            key={currency.price + Math.random()}
            currency={currency}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectCurrencyModal;
