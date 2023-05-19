const path = require("path");
const gateway = require("express-gateway");
const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./.serviceAccounts/cars-eu-firebase-adminsdk-jm7e1-337727581c.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

gateway().load(path.join(__dirname, "config")).run();