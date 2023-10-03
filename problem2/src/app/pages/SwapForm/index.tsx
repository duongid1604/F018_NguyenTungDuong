"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import {
  toggleFirstCurrencyClicked,
  toggleModal,
  toggleSecondCurrencyClicked,
  updateFirstCurrencyData,
  updateSecondCurrencyData,
} from "@/app/redux/slices/system.slice";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";

const SwapForm = () => {
  const [firstInputAmount, setFirstInputAmount] = useState("");
  const [secondInputAmount, setSecondInputAmount] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const { firstCurrency, secondCurrency } = useAppSelector(
    (state) => state.system
  );

  const dispatch = useAppDispatch();

  const handleFirstInputAmountChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFirstInputAmount(event.target.value);
    setIsError(false);
  };
  const handleSecondInputAmountChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSecondInputAmount(event.target.value);
    setIsError(false);
  };

  const handleSwapClicked = () => {
    setFirstInputAmount(secondInputAmount);
    dispatch(updateFirstCurrencyData(secondCurrency));

    setSecondInputAmount(firstInputAmount);
    dispatch(updateSecondCurrencyData(firstCurrency));
  };

  const handleFirstDropdownClick = () => {
    dispatch(toggleFirstCurrencyClicked(true));
    setFirstInputAmount("");
  };

  const handleSecondDropdownClick = () => {
    dispatch(toggleSecondCurrencyClicked(true));
    setSecondInputAmount("");
  };

  const CustomDropdown = ({
    currency,
    onClick,
  }: {
    currency: string;
    onClick: () => void;
  }) => {
    const onDropdownClicked = () => {
      dispatch(toggleModal());
      onClick();
    };

    return (
      <div className={styles.dropdownContainer} onClick={onDropdownClicked}>
        <div className={styles.currencyContainer}>
          <img src={`${currency}.svg`} />
          <p>{currency}</p>
          <KeyboardArrowDownOutlinedIcon />
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (firstInputAmount.length > 0 && focusedInput === "firstInput") {
      let result: number =
        Number(firstInputAmount) * (firstCurrency.price / secondCurrency.price);

      if (result < 0.001) {
        setIsError(true);
      }

      setSecondInputAmount(result.toFixed(2));
      return;
    }

    if (secondInputAmount.length > 0 && focusedInput === "secondInput") {
      let result: number =
        Number(secondInputAmount) *
        (secondCurrency.price / firstCurrency.price);

      if (result < 0.001) {
        setIsError(true);
      }

      setFirstInputAmount(result.toFixed(2));
      return;
    }
  }, [firstInputAmount, secondInputAmount]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputContainer}>
        <input
          name="firstInput"
          type="number"
          placeholder="0"
          value={firstInputAmount}
          onChange={(event) => handleFirstInputAmountChange(event)}
          onFocus={() => setFocusedInput("firstInput")}
          onBlur={() => setFocusedInput(null)}
        />
        <CustomDropdown
          currency={firstCurrency.currency}
          onClick={handleFirstDropdownClick}
        />
      </div>

      <div className={styles.break}></div>

      <div className={styles.inputContainer}>
        <input
          name="secondInput"
          type="number"
          placeholder="0"
          value={secondInputAmount}
          onChange={(event) => handleSecondInputAmountChange(event)}
          onFocus={() => setFocusedInput("secondInput")}
          onBlur={() => setFocusedInput(null)}
        />
        <CustomDropdown
          currency={secondCurrency.currency}
          onClick={handleSecondDropdownClick}
        />
      </div>

      {isError && (
        <p className={styles.errorMsg}>
          The number input is too small, try another number!
        </p>
      )}

      <button onClick={handleSwapClicked}>
        <SwapHorizIcon fontSize="large" />
      </button>
    </div>
  );
};

export default SwapForm;
