const path = require("path");

const express = require("express");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

const route = require("./routes/index");
const db = require("./config/db");
const session = require("./config/sessions/index");

// METHOD OVERRIDE
app.use(methodOverride("_method"));

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// For parsing application/json
app.use(express.json());

// DATABASE CONNECTION
db.connect();

// EXPRESS HANDLEBARS
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/resources/views"));

// SET UP SESSION
session.config(app);

// APP ROUTER from src/routes
route(app);

app.listen(port, () => {
  console.log(`Sneaker Shop server starts on http://localhost:${port}/`);
});
