const homeRouter = require("./home");
const signUpRouter = require("./sign-up");

function route(app) {
  app.use("/home", homeRouter);

  app.use("/sign-up", signUpRouter);
}

module.exports = route;
