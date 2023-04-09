import { nanoid } from "nanoid";
import { CreateTransactionData, Transaction } from "../models/transactionModel";
import { sendTransaction } from "./messageBrokerService";

const transactions: Transaction[] = [
  {
    id: "ewLnVu8FS50p8MBm8fxP0",
    offerId: "yes",
    title: "Transaction",
    description: "Transaction desc",
    amount: 500,
    sender: "Me",
    recipient: "You",
    createdAt: 1680893515413,
  },
];

const getTransactions = (): Transaction[] => {
  return transactions;
};

const getTransaction = (transactionId: string): Transaction | null => {
  const data = transactions.find(
    (transaction) => transaction.id === transactionId
  );
  return data || null;
};

const createTransaction = (data: CreateTransactionData): Transaction => {
  const transaction: Transaction = {
    id: nanoid(),
    createdAt: Date.now(),
    ...data,
  };

  transactions.push(transaction);

  return transaction;
};

const updateTransaction = (
  transactionId: string,
  updatedTransaction: Partial<Transaction>
): Transaction | null => {
  const data = transactions.find(
    (transaction) => transaction.id === transactionId
  );

  if (!data) {
    return null;
  }

  const newTransaction: Transaction = {
    ...data,
    ...updatedTransaction,
  };

  const index = transactions.indexOf(data);
  transactions[index] = newTransaction;

  return newTransaction;
};

const deleteTransaction = (transactionId: string): boolean => {
  const data = transactions.find(
    (transaction) => transaction.id === transactionId
  );

  if (!data) {
    return false;
  }

  const index = transactions.indexOf(data);
  transactions.splice(index, 1);

  return true;
};

const completeTransaction = (
  transactionId: string,
  success: boolean
): Transaction | null => {
  const data = transactions.find(
    (transaction) => transaction.id === transactionId
  );
  console.log(data);

  if (!data) {
    return null;
  }

  const completedTransaction: Transaction = {
    ...data,
    success,
  };
  console.log(completedTransaction);

  const index = transactions.indexOf(data);
  transactions[index] = completedTransaction;

  sendTransaction({
    ...completedTransaction,
  });

  return completedTransaction;
};

export default {
  getTransactions,
  getTransaction,
  deleteTransaction,
  updateTransaction,
  createTransaction,
  completeTransaction,
};
