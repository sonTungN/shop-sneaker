const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const slug = require("mongoose-slug-updater");
// mongoose.plugin(slug);

const Shoes = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    stars: { type: Number, required: true },
    imageId: { type: Number, required: true },
  },
  { timestamps: false },
);

module.exports = mongoose.model("Shoes", Shoes);
