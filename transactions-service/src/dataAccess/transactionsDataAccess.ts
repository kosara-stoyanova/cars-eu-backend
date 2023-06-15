import mysql, { Connection, RowDataPacket } from "mysql2/promise";
import { Transaction } from "../models/transactionModel";

let connection: Connection;

export const run = async (dbUrl: string) => {
  try {
    connection = await mysql.createConnection(dbUrl);
    await connection.connect();
    console.log("Connected to PlanetScale.");
  } catch (error) {
    if (error) {
      console.error("Unable to connect to PlanetScale: ", error);
      return;
    }
  }
};

export const closeConnection = async () => {
  console.log("Closing Planetscale connection...");

  // Close the Planetscale connection
  await connection.end();

  console.log("Planetscale connection closed");
};

const transactionsDataAccess = () => {
  const getTransactions = async (): Promise<Transaction[] | null> => {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM transactions`
      );

      if (Array.isArray(results)) {
        // Assuming `results` is an array of objects that match the `Transaction` structure
        const transactions: Transaction[] = results.map(
          (row: RowDataPacket) => {
            // Map the row data to your Transaction object properties
            return {
              id: row.id,
              offerId: row.offerId,
              title: row.title,
              description: row.description,
              amount: row.amount,
              sender: row.sender,
              recipient: row.recipient,
              createdAt: row.createdAt,
            };
          }
        );

        return transactions;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error retrieving transaction:", error);
      throw error;
    }
  };

  const getTransaction = async (
    transactionId: string
  ): Promise<Transaction | null> => {
    try {
      const [results] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM transactions WHERE id = '${transactionId}'`
      );

      if (Array.isArray(results)) {
        if (results.length === 0) {
          console.log("Transaction not found");
          return null;
        }

        const transaction = results[0] as Transaction;
        console.log("Transaction retrieved:", transaction);
        return transaction;
      } else {
        console.log("Invalid results returned");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving transaction:", error);
      throw error;
    }
  };

  const createTransaction = async (
    data: Transaction
  ): Promise<Transaction | null> => {
    try {
      await connection.query(`INSERT INTO transactions (id, offerId, title, description, amount, sender, recipient, createdAt, success)
      VALUES ('${data.id}', '${data.offerId}', '${data.title}', '${data.description}', ${data.amount}, '${data.sender}', '${data.recipient}', ${data.createdAt}, ${data.success})`);

      console.log("Transaction inserted successfully");
      return getTransaction(data.id);
    } catch (error) {
      console.error("Error inserting transaction:", error);
      throw error;
    }
  };

  const updateTransaction = async (
    transactionId: string,
    updatedTransaction: Transaction
  ): Promise<Transaction | null> => {
    try {
      const result = await connection.query(`
      UPDATE transactions
      SET title = '${updatedTransaction.title}', description = '${updatedTransaction.description}', amount = '${updatedTransaction.amount}', recipient = '${updatedTransaction.recipient}', sender = '${updatedTransaction.sender}'
      WHERE id = '${transactionId}'
    `);

      console.log("Transaction inserted successfully");
      return getTransaction(transactionId);
    } catch (error) {
      console.error("Error inserting transaction:", error);
      throw error;
    }
  };

  const deleteTransaction = async (transactionId: string): Promise<boolean> => {
    try {
      const query = `DELETE FROM transactions WHERE id = '${transactionId}'`;
      await connection.query(query);

      return true;
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  };

  return {
    run,
    getTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

export default transactionsDataAccess;
