const express = require("express");
const router = express.Router();
const checkUserSession = require("../utils/session");

const meController = require("../app/controllers/MeController");

router.get("/cart", checkUserSession, meController.display);

router.get("/dashboard", meController.show);

module.exports = router;
