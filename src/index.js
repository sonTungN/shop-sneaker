const path = require("path");

const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// EXPRESS HANDLEBARS
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/resources/views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Sneaker Shop server starts on http://localhost:${port}/`);
});
