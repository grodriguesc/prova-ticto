"use client";

import { Header } from "@/components/header/header";
import SummaryCards from "@/components/summary-cards/summary-cards";
import TransactionTable from "@/components/transaction-table/transaction-table";
import { TransactionProvider } from "./context/transaction-context";

export default function Home() {
  return (
    <main>
      <TransactionProvider>
        <Header />
        <SummaryCards />
        <TransactionTable />
      </TransactionProvider>
    </main>
  );
}
