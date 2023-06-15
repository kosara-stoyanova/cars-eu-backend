import { RequestHandler } from "express";
import transactionService from "../services/transactionService";
import transactionsService from "../services/transactionService";

export const getTransactions: RequestHandler = async (req, res) => {
  try {
    const transactions = await transactionService().getTransactions();
    res.status(200).json({ data: transactions });
  } catch (err: any) {
    res.status(500).send({
      error: `The transactions cannot be retrieved! ${err.message ?? ""}`,
    });
  }
};

export const getTransaction: RequestHandler = async (req, res) => {
  const transactionId = req.params.transactionId;

  try {
    const transaction = await transactionsService().getTransaction(
      transactionId
    );
    if (!transaction) {
      res
        .status(404)
        .send("The transaction that you are trying to get does not exist!");
    } else {
      res.status(200).json({ data: transaction });
    }
  } catch (err: any) {
    res.status(500).send({
      error: `The transaction with id ${transactionId} cannot be retrieved! ${
        err.message ?? ""
      }`,
    });
  }
};

export const createTransaction: RequestHandler = async (req, res) => {
  const data = req.body.transaction;

  try {
    const transaction = await transactionsService().createTransaction(data);

    res.status(201).json({ data: transaction });
  } catch (err: any) {
    res.status(500).send({
      error: `The transaction cannot be created! ${err.message ?? ""}`,
    });
  }
};

export const updateTransaction: RequestHandler = async (req, res) => {
  const transactionId = req.params.transactionId;
  const data = req.body.transaction;

  try {
    const updatedTransaction = await transactionsService().updateTransaction(
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
  } catch (err: any) {
    res.status(500).send({
      error: `The transaction cannot be updated! ${err.message ?? ""}`,
    });
  }
};

export const deleteTransaction: RequestHandler = async (req, res) => {
  const transactionId = req.params.transactionId;

  const result = await transactionsService().deleteTransaction(transactionId);

  try {
    if (!result) {
      res
        .status(404)
        .send("The transaction that you are trying to delete does not exist!");
    } else {
      res.status(200).send("The transaction has been successfully deleted");
    }
  } catch (err: any) {
    res.status(500).send({
      error: `The transaction cannot be deleted! ${err.message ?? ""}`,
    });
  }
};

export const completeTransaction: RequestHandler = async (req, res) => {
  const transactionId = req.params.transactionId;
  const data = req.body.success;

  try {
    const completedTransaction = await transactionService().completeTransaction(
      transactionId,
      data
    );

    if (!completedTransaction) {
      res
        .status(404)
        .send(
          "The transaction that you are trying to complete does not exist!"
        );
    } else {
      res.status(200).json({ data: completedTransaction });
    }
  } catch (err: any) {
    res.status(500).send({
      error: `The transaction with id ${transactionId} cannot be retrieved! ${
        err.message ?? ""
      }`,
    });
  }
};
