import express, { Express, Request, Response } from "express";
import router from "./routes/offerRouter";
import { connectMessageBroker } from "./services/messageBrokerService";
import { run } from "./dataAccess/offersDataAccess";
import { MongoClient, ServerApiVersion } from "mongodb";
import config from "./config";
import cors from "cors";

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

// app.options("/offers", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "HEAD, PUT, PATCH, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.sendStatus(200);
// });

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

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

export default app;
