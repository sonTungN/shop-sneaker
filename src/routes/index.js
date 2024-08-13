const homeRouter = require("./home");
const userRouter = require("./user");
const meRouter = require("./me");

function route(app) {
  app.use("/user", userRouter);

  app.use("/dashboard", meRouter);

  app.use("/", homeRouter);
}

module.exports = route;
