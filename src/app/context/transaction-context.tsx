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
}

const TransactionContext = createContext<TransactionContextData>({
  transactions: [],
  addTransaction: () => {},
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

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}
