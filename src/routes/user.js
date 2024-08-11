const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

router.post("/:email/store", userController.store);

router.get("/sign-up", userController.create);

router.get("/sign-in", userController.entry);

module.exports = router;
