import { createContext, ReactNode, useEffect, useState } from "react";

export interface TransactionData {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAat: string;
}

interface TransactionsContextType {
  transactions: TransactionData[];
  createTransaction: (data: TransactionData) => void;
  loadTransactions: () => void;
  summary: () => { income: number; outcome: number; total: number };
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  async function loadTransactions() {
    const response = await fetch(
      "https://3333-dc1991lau-reactexpenset-sjwudnevoxe.ws-eu84.gitpod.io/transactions"
    );
    const data = await response.json();
    setTransactions(data);
  }

  async function createTransaction(data: TransactionData) {}

  function summary() {
    const sum = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.price;
          acc.total += transaction.price;
        } else {
          acc.outcome += transaction.price;
          acc.total -= transaction.price;
        }
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );

    return sum;
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ createTransaction, loadTransactions, transactions, summary }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
