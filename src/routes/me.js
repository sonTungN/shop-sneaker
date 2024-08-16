const express = require("express");
const router = express.Router();
const checkUserSession = require("../utils/session");

const meController = require("../app/controllers/MeController");

router.post("/cart/:id/delete", meController.delete);

router.get("/cart", checkUserSession, meController.display);

router.post("/:id/add", checkUserSession, meController.add);

router.get("/", meController.show);

module.exports = router;
