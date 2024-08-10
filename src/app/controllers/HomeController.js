class HomeController {
  // [GET] /home
  show(req, res) {
    res.render("home/home", {
      title: "Sneaker Shop",
      styles: ["app.css", "header.css", "footer.css"],
    });
  }
}

module.exports = new HomeController();
