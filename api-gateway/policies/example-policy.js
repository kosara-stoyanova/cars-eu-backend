module.exports = {
  name: "example",
  schema: {
    $id: "http://express-gateway.io/schemas/policies/example-policy.json",
    type: "object",
    properties: {
      baseUrl: {
        type: "string",
        format: "url",
        default: "https://example.com/",
      },
    },
  },
  policy: (actionParams) => {
    return (req, res, next) => {
      console.log(
        "executing policy-from-example-plugin with params",
        actionParams
      );
      next(); // calling next policy
      // or write response:  res.json({result: "this is the response"})
    };
  },
};
