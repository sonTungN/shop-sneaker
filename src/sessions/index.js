const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

function init(app) {
  app.use(
    session({
      secret: "Tung Nguyen",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60,
      },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    }),
  );
}

module.exports = { init };
