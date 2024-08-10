const User = require("../model/User");

class UserController {
  // [GET] /sign-up
  create(req, res, next) {
    res.render("sign-up", {
      layout: "blank",
      title: "Sign Up",
      styles: ["sign-up.css"],
    });
  }

  async store(req, res, next) {
    // res.json(req.body);
    const user = new User(req.body);
    await user
      .save()
      .then(() => res.redirect("/home"))
      .catch(next);
  }
}

module.exports = new UserController();
