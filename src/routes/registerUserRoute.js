const express = require("express");
const router = express.Router();
const registerUserController = require("../controllers/registerUserController");

router.post("/store", registerUserController.registerUserAdd);
router.get("/list", registerUserController.registerUserGetAll);
router.delete("/delete/:id", registerUserController.registerUserDelete);
router.put("/updateComment/:id", registerUserController.registerUserComment);

module.exports = router;
