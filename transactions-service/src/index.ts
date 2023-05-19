import express, { Express, Request, Response } from "express";
import router from "./routes/transactionRouter";
import { connect } from "./services/messageBrokerService";
import config from "./config.js";

const app: Express = express();

const port = config.PORT;
const host = config.HOST;

const mbUri = config.MB_URI;

console.log("yey");

app.get("/", (req: Request, res: Response) => {
  res.redirect("https://www.youtube.com/watch?v=rs6Y4kZ8qtw");
});

app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server started at port: http://${host}:${port}`);
  connect(mbUri);
});
