import express, { Express, Request, Response } from "express";
import router from "./routes/transactionRouter";
import { connect } from "./services/messageBrokerService";
import config from "./config.js";
import mysql, { Connection } from "mysql2";
import { closeConnection, run } from "./dataAccess/transactionsDataAccess";

const app: Express = express();

const port = config.PORT;
const host = config.HOST;

const dbUrl = config.DB_URL;
const mbUri = config.MB_URI;

console.log("yey");

app.get("/", (req: Request, res: Response) => {
  res.redirect("https://www.youtube.com/watch?v=rs6Y4kZ8qtw");
});

app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server started at port: http://${host}:${port}`);
  connect(mbUri);
  run(dbUrl);
});

// Handle termination signal
process.on("SIGINT", () => {
  closeConnection();
  process.exit(0); // Exit the application with success code
});
