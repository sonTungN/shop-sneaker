const User = require("../models/User");
const { mongooseToObject } = require("../../utils/mongoose");
const { hashPassword, comparePassword } = require("../../utils/helper");

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

      const user = new User({
        ...req.body,
        password: hashPassword(req.body.password),
      });
      await user
        .save()
        .then((user) => res.redirect("/user/sign-in"))
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

  // [POST] /user/:email/auth
  async auth(req, res, next) {
    try {
      const matchedUser = await User.findOne({ email: req.params.email });
      if (!matchedUser) {
        return res.json({ message: "User Not Found..." });
      }

      const matchedUserObj = mongooseToObject(matchedUser);
      const storedPassword = matchedUserObj.password;
      if (!comparePassword(req.body.password, storedPassword)) {
        return res.json({
          message: "Passwords don't match. Authentication failed!",
        });
      }

      req.session.regenerate(function (err) {
        if (err) next(err);

        req.session.user = {
          id: matchedUserObj._id,
          email: matchedUserObj.email,
        };
        res.redirect("/me");
      });
    } catch (err) {
      next(err);
    }
  }

  status(req, res, next) {
    res.json({ sessionID: req.session.id, session: req.session });
  }

  quit(req, res, next) {
    req.session.user = null;
    req.session.save(function (err) {
      if (err) next(err);

      // req.session.regenerate(function (err) {
      //   if (err) next(err);
      //   res.redirect("/");
      // });

      req.session.destroy(function (err) {
        if (err) next(err);
        res.redirect("/");
      });
    });
  }
}

module.exports = new UserController();
