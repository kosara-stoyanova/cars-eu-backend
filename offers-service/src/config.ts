import dotenv from "dotenv";
import path from "path";

dotenv.config();

// if (process.env.NODE_ENV === "prod") {
//   dotenv.config({
//     path: path.resolve(__dirname, `../.env.prod`),
//   });
// } else {
//   dotenv.config({
//     path: path.resolve(__dirname, `../.env.dev`),
//   });
// }

const config = {
  NODE_ENV: process.env.NODE_ENV || "dev",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 8081,
  DB_URI:
    process.env.DB_URI ||
    "mongodb+srv://userOffersTest:aaLsUzxms6d5NMfl@cars-eu.sxpznv3.mongodb.net/?retryWrites=true&w=majority",
  DB_NAME: process.env.DB_NAME || "offers-test",
  DB_COLL_NAME: process.env.DB_COLL_NAME || "offers",
  MB_URI:
    process.env.MB_URI ||
    "amqps://obyqdmlr:5gTHLMWVaIp7di6ZzlAthZIyRqFf6KbA@kangaroo.rmq.cloudamqp.com/obyqdmlr",
};

export default config;
