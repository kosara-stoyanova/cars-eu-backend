import bodyParser from "body-parser";
import express from "express";
import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  completeTransaction,
} from "../controllers/transactionController";
const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/transactions", getTransactions);

router.get("/transactions/:transactionId", getTransaction);

router.post("/transactions", jsonParser, createTransaction);

router.put("/transactions/:transactionId", jsonParser, updateTransaction);

router.delete("/transactions/:transactionId", deleteTransaction);

router.put(
  "/transactions/complete/:transactionId",
  jsonParser,
  completeTransaction
);

export default router;
