const firebaseAdmin = require("firebase-admin");

module.exports = {
  name: "firebase-auth-policy",
  version: "0.0.1",
  init: () => {},
  policy: (actionParams) => {
    console.log("yey");
    return (req, res, next) => {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        console.log("not authenticated");
        console.log(authorizationHeader);

        return res.status(401).send({ error: "Unauthenticated" });
      }
      const idToken = authorizationHeader.split("Bearer ")[1];
      firebaseAdmin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          req.user = decodedToken;
          next();
        })
        .catch((error) => {
          console.log(error);

          console.log("not authorized");

          return res.status(401).send({ error: "Unauthorized" });
        });
    };
  },
};
