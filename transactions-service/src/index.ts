import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/transactionRouter";
import { connect } from "./services/messageBrokerService";

dotenv.config();

const app: Express = express();
const port = process.env.DEV_PORT;

console.log("yey");

app.get("/", (req: Request, res: Response) => {
  res.redirect("https://www.youtube.com/watch?v=rs6Y4kZ8qtw");
});

app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server started at port: http://localhost:${port}`);
  connect();
});
