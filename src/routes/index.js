const homeRouter = require("./home");
const userRouter = require("./user");
const meRouter = require("./me");

function route(app) {
  app.use("/user", userRouter);

  app.use("/me", meRouter);

  app.use("/", homeRouter);
}

module.exports = route;
