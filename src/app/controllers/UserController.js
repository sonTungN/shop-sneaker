const User = require("../model/User");

class UserController {
  // [GET] /user/sign-up
  create(req, res, next) {
    res.render("sign-up", {
      layout: "blank",
      title: "Sign Up",
      styles: ["sign-up.css"],
    });
  }

  // [POST] /user/:email/store
  async store(req, res, next) {
    try {
      const isExisted = await User.findOne({ email: req.params.email });
      if (isExisted) {
        return res
          .status(400)
          .json({ message: "Email already exists. Please try again!" });
      }

      const user = new User(req.body);
      await user
        .save()
        .then((user) => res.redirect("/"))
        .catch(next);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /user/sign-in
  entry(req, res, next) {
    res.render("sign-in", {
      layout: "blank",
      title: "Sign In",
      styles: ["sign-in.css"],
    });
  }
}

module.exports = new UserController();
