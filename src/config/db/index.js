const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/sneaker_shop")
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("DB Connection Error: ", err));
}

module.exports = { connect };
