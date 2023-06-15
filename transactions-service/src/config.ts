import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV || "dev",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 8082,
  DB_URL: process.env.DB_URL || "",
  MB_URI: process.env.MB_URI || "",
};
