import dotenv from "dotenv";
import path from "path";

const config = dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 8081,
  DB_URI:
    process.env.DB_URI ||
    "mongodb+srv://admin:admin@cars-eu.sxpznv3.mongodb.net/?retryWrites=true&w=majority",
  DB_NAME: process.env.DB_NAME || "offers-data",
  DB_COLL_NAME: process.env.DB_COLL_NAME || "offers",
  MB_URI:
    process.env.MB_URI ||
    "amqps://obyqdmlr:5gTHLMWVaIp7di6ZzlAthZIyRqFf6KbA@kangaroo.rmq.cloudamqp.com/obyqdmlr",
};
