import dotenv from "dotenv";
import path from "path";

// dotenv.config({
//   path: path.resolve(__dirname, `../.env`),
// });

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "dev") {
  dotenv.config({
    path: path.resolve(__dirname, `../.env`),
  });
} else {
  dotenv.config();
}

export default {
  NODE_ENV: process.env.NODE_ENV || "dev",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 8082,
  DB_URL: process.env.DATABASE_URL || "",
  MB_URI: process.env.MB_URI || "",
};
