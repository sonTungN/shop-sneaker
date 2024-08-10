const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

router.post("/store", userController.store);

router.get("/", userController.create);

module.exports = router;
