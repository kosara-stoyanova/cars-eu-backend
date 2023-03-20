import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.DEV_PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("https://www.youtube.com/watch?v=rs6Y4kZ8qtw");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server started at port: http://localhost:${port}`);
});
