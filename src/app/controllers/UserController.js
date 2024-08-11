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
    const user = new User(req.body);
    await user
      .save()
      .then(() => res.redirect("/"))
      .catch(next);
  }

  entry(req, res, next) {
    res.render("sign-in", {
      layout: "blank",
      title: "Sign In",
      styles: ["sign-in.css"],
    });
  }
}

module.exports = new UserController();
