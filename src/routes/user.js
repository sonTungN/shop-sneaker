const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

router.get("/sign-up", userController.create);
router.post("/:email/store", userController.store);

router.get("/sign-in", userController.entry);
router.post("/:email/auth", userController.auth);

router.get("/:email/auth/status", userController.status);

router.get("/logout", userController.quit);

module.exports = router;
