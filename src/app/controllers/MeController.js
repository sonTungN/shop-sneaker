const User = require("../models/User");
const Shoes = require("../models/Shoes");
const { multipleMongooseToObject } = require("../../utils/mongoose");

// const { hashPassword, comparePassword } = require("../../utils/helper");

class MeController {
  show(req, res, next) {
    Shoes.find({})
      .then((shoes) =>
        res.render("home", {
          user: req.session.user,
          shoes: multipleMongooseToObject(shoes),
          title: "Dashboard",
          styles: ["app.css", "header.css", "footer.css"],
        }),
      )
      .catch(next);
  }

  display(req, res, next) {
    res.send("Go to cart");
  }
}

module.exports = new MeController();
