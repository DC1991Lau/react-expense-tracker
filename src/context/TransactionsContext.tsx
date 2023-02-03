import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

export interface TransactionData {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

export interface CreateTransactionData {
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
}

interface TransactionsContextType {
  transactions: TransactionData[];
  createTransaction: (data: CreateTransactionData) => Promise<void>;
  fetchTransactions: (query?: string) => Promise<void>;
  summary: () => { income: number; outcome: number; total: number };
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });
    setTransactions(response.data);
  }

  async function createTransaction(data: CreateTransactionData) {
    const { category, description, price, type } = data;
    const response = await api.post("transactions", {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);
  }

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
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ createTransaction, fetchTransactions, transactions, summary }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
