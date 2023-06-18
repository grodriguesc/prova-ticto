import React, { createContext, useContext, useState, ReactNode } from "react";

export enum TransactionType {
  Income = "income",
  Outcome = "outcome",
}

export interface TransactionData {
  name: string;
  price: string;
  rawPrice: number;
  category: string;
  type: TransactionType;
  date: Date;
}

interface TransactionContextData {
  transactions: TransactionData[];
  addTransaction: (transaction: TransactionData) => void;
  deleteTransaction: (index: number) => void;
}

const TransactionContext = createContext<TransactionContextData>({
  transactions: [],
  addTransaction: () => {},
  deleteTransaction: () => {},
});

export function useTransaction(): TransactionContextData {
  return useContext(TransactionContext);
}

interface TransactionProviderProps {
  children: ReactNode;
}

export function TransactionProvider({
  children,
}: TransactionProviderProps): JSX.Element {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  const addTransaction = (transaction: TransactionData) => {
    setTransactions((currentTransactions) => [
      ...currentTransactions,
      transaction,
    ]);
  };

  const deleteTransaction = (index: number) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((_, idx) => idx !== index)
    );
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
