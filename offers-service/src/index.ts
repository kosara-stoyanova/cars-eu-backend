import express, { Express, Request, Response } from "express";
import router from "./routes/offerRouter";
import { connectMessageBroker } from "./services/messageBrokerService";
import { run } from "./dataAccess/offersDataAccess";
import { MongoClient, ServerApiVersion } from "mongodb";
import config from "./config.js";

const app: Express = express();

const port = config.PORT;
const host = config.HOST;

const mbUri = config.MB_URI;
const dbUri = config.DB_URI;

const client = new MongoClient(dbUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbName = config.DB_NAME;
const collName = config.DB_COLL_NAME;

app.get("/", (req: Request, res: Response) => {
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server started at port: http://${host}:${port}`);
  connectMessageBroker(mbUri);
  run(client, dbName, collName);
});

// Handle termination signal
process.on("SIGINT", () => {
  console.log("Closing MongoDB connection...");

  // Close the MongoDB connection
  client
    .close()
    .then(() => {
      console.log("MongoDB connection closed");
      process.exit(0); // Exit the application with success code
    })
    .catch((err) => {
      console.error("Error closing MongoDB connection:", err);
      process.exit(1); // Exit the application with an error code
    });
});