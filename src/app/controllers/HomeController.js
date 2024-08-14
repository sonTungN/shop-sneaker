const Shoes = require("../models/Shoes");
const { multipleMongooseToObject } = require("../../utils/mongoose");

class HomeController {
  // [GET] /home
  show(req, res, next) {
    Shoes.find({})
      .then((shoes) =>
        res.render("home", {
          user: null,
          shoes: multipleMongooseToObject(shoes),
          title: "Sneaker Shop",
          styles: ["app.css", "header.css", "footer.css"],
        }),
      )
      .catch(next);
  }
}

module.exports = new HomeController();
