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

export default {
  NODE_ENV: process.env.NODE_ENV || "dev",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 8082,
  DB_URL:
    process.env.DB_URL ||
    'mysql://yl3drf0sw75bncbxbc8s:pscale_pw_vJ4LXIcmshXoc1t4YQrXSWzMrxtO5fjCOkWKT3rlVn7@aws.connect.psdb.cloud/cars-eu-transactions?ssl={"rejectUnauthorized":true}',
  MB_URI:
    process.env.MB_URI ||
    "amqps://obyqdmlr:5gTHLMWVaIp7di6ZzlAthZIyRqFf6KbA@kangaroo.rmq.cloudamqp.com/obyqdmlr",
};
