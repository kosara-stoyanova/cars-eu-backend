module.exports = {
  version: "0.0.1",
  init: function (pluginContext) {
    let policy = require("./firebase-auth-policy.js");
    pluginContext.registerPolicy(policy);
  },
};
