const User = require("../model/User");
// const { mongooseToObject } = require("../../utils/mongoose");

// const { hashPassword, comparePassword } = require("../../utils/helper");

class MeController {
  show(req, res, next) {
    const currUser = req.session.user;
    res.render("home", {
      user: currUser,
      title: "Dashboard",
      styles: ["app.css", "header.css", "footer.css"],
    });
  }
}

module.exports = new MeController();
