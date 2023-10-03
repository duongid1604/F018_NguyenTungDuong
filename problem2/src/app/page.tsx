"use client";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import SwapForm from "./pages/SwapForm";
import SelectCurrencyModal from "./pages/SwapForm/components/SelectCurrencyModal";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import {
  toggleFirstCurrencyClicked,
  toggleModal,
  toggleSecondCurrencyClicked,
} from "./redux/slices/system.slice";
import { getListCurrency } from "./redux/thunks/currency.thunk";

export default function Home() {
  const isModalOpen = useAppSelector((state) => state.system.isModalOpen);
  const dispatch = useAppDispatch();

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getListCurrency());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch(toggleModal());
        dispatch(toggleFirstCurrencyClicked(false));
        dispatch(toggleSecondCurrencyClicked(false));
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <main
      className={styles.main}
      style={isModalOpen ? { backgroundColor: "#dee2e6" } : {}}
    >
      <SwapForm />

      {isModalOpen && (
        <div ref={modalRef} className={styles.modalContainer}>
          <SelectCurrencyModal />
        </div>
      )}
    </main>
  );
}
