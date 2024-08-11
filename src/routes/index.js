const homeRouter = require("./home");
const signUpRouter = require("./sign-up");

function route(app) {
  app.use("/sign-up", signUpRouter);
  
  app.use("/", homeRouter);
}

module.exports = route;
