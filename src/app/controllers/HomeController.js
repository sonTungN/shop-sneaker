class HomeController {
  // [GET] /
  show(req, res) {
    res.render("home", {
      title: "Sneaker Shop",
      styles: ["app.css", "header.css"],
    });
  }
}

module.exports = new HomeController();
