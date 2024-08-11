const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

router.get("/sign-up", userController.create);

router.get("/sign-in", userController.entry);

router.post("/store", userController.store);

module.exports = router;
