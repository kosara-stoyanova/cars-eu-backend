const path = require("path");
const dotenv = require("dotenv");
const gateway = require("express-gateway");
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./.serviceAccounts/service-account.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

dotenv.config();

if (process.env.NODE_ENV === "prod") {
  gateway().load(path.join(__dirname, "config")).run();
} else {
  gateway().load(path.join(__dirname, "config-prod")).run();
}
