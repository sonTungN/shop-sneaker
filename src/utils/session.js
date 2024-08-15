module.exports = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/user/sign-in");
  }
};
