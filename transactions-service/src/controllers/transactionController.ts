import { RequestHandler } from "express";
import transactionService from "../services/transactionService";

export const getTransactions: RequestHandler = (req, res) => {
  const transactions = transactionService.getTransactions();

  res.status(200).json({ data: transactions });
};

export const getTransaction: RequestHandler = (req, res) => {
  const transactionId = req.params.transactionId;

  const transaction = transactionService.getTransaction(transactionId);

  res.status(200).json({ data: transaction });
};

export const createTransaction: RequestHandler = (req, res) => {
  const data = req.body.transaction;

  const transaction = transactionService.createTransaction(data);

  res.status(201).json({ data: transaction });
};

export const updateTransaction: RequestHandler = (req, res) => {
  const transactionId = req.params.transactionId;
  const data = req.body.transaction;

  const updatedTransaction = transactionService.updateTransaction(
    transactionId,
    data
  );

  if (!updatedTransaction) {
    res
      .status(404)
      .send("The transaction that you are trying to update does not exist!");
  } else {
    res.status(200).json({ data: updatedTransaction });
  }
};

export const deleteTransaction: RequestHandler = (req, res) => {
  const transactionId = req.params.transactionId;

  const result = transactionService.deleteTransaction(transactionId);

  if (!result) {
    res
      .status(404)
      .send("The transaction that you are trying to delete does not exist!");
  } else {
    res.status(200).send("The transaction has been successfully deleted");
  }
};

export const completeTransaction: RequestHandler = (req, res) => {
  const transactionId = req.params.transactionId;
  const data = req.body.success;

  const completedTransaction = transactionService.completeTransaction(
    transactionId,
    data
  );

  if (!completedTransaction) {
    res
      .status(404)
      .send("The transaction that you are trying to update does not exist!");
  } else {
    res.status(200).json({ data: completedTransaction });
  }
};
