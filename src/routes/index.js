const homeRouter = require("./home");

function route(app) {
  app.get("/", homeRouter);
}

module.exports = route;
