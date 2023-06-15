import { nanoid } from "nanoid";
import { CreateTransactionData, Transaction } from "../models/transactionModel";
import { sendTransaction } from "./messageBrokerService";
import transactionsDataAccess from "../dataAccess/transactionsDataAccess";
import { isEmpty, isNil } from "ramda";

// const transactionsArray: Transaction[] = [
//   {
//     id: "ewLnVu8FS50p8MBm8fxP0",
//     offerId: "yes",
//     title: "Transaction",
//     description: "Transaction desc",
//     amount: 500,
//     sender: "Me",
//     recipient: "You",
//     createdAt: 1680893515413,
//   },
// ];

const isNilOrEmpty = (value: any): value is null | undefined | [] | {} | "" =>
  isNil(value) || isEmpty(value);

const transactionsService = () => {
  const getTransactions = async (): Promise<Transaction[] | null> => {
    const transactions = await transactionsDataAccess().getTransactions();
    return transactions;
  };

  const getTransaction = async (
    transactionId: string
  ): Promise<Transaction | null> => {
    const transaction = await transactionsDataAccess().getTransaction(
      transactionId
    );

    if (transaction === null) {
      return null;
    }

    return transaction;
  };

  const createTransaction = async (
    data: CreateTransactionData
  ): Promise<Transaction | null> => {
    if (
      isNilOrEmpty(data.offerId) ||
      isNilOrEmpty(data.title) ||
      isNilOrEmpty(data.description) ||
      isNilOrEmpty(data.amount) ||
      isNilOrEmpty(data.recipient) ||
      isNilOrEmpty(data.sender)
    ) {
      throw Error("Data is missing!");
    }

    const transactionObject: Transaction = {
      id: nanoid(),
      createdAt: Date.now(),
      success: false,
      ...data,
    };

    const transaction = await transactionsDataAccess().createTransaction(
      transactionObject
    );

    return transaction;
  };

  const updateTransaction = async (
    transactionId: string,
    updatedTransaction: Partial<Transaction>
  ): Promise<Transaction | null> => {
    const data = await getTransaction(transactionId);

    if (!data) {
      return null;
    }

    const updated: Transaction = {
      ...data,
      ...updatedTransaction,
    };

    const newTransaction = await transactionsDataAccess().updateTransaction(
      transactionId,
      updated
    );

    return newTransaction;
  };

  const deleteTransaction = async (transactionId: string): Promise<boolean> => {
    const data = await getTransaction(transactionId);

    if (!data) {
      return false;
    }

    const result = await transactionsDataAccess().deleteTransaction(
      transactionId
    );

    return true;
  };

  const completeTransaction = async (
    transactionId: string,
    success: boolean
  ): Promise<Transaction | null> => {
    const data = await getTransaction(transactionId);
    console.log(data);

    if (!data) {
      return null;
    }

    const completedTransaction: Transaction = {
      ...data,
      success,
    };
    console.log(completedTransaction);

    await transactionsDataAccess().updateTransaction(
      transactionId,
      completedTransaction
    );

    sendTransaction({
      ...completedTransaction,
    });

    return completedTransaction;
  };

  return {
    getTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    completeTransaction,
  };
};
export default transactionsService;
