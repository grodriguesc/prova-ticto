"use client";

import { Header } from "@/components/header/header";
import SummaryCards from "@/components/summary-cards/summary-cards";
import TransactionTable from "@/components/transaction-table/transaction-table";

export default function Home() {
  return (
    <main>
      <Header />
      <SummaryCards />
      <TransactionTable />
    </main>
  );
}
