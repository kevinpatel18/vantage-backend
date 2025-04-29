const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.post("/store", contactController.contactAdd);
router.get("/list", contactController.contactGetAll);
router.delete("/delete/:id", contactController.contactDelete);
router.put("/updateCommnet/:id", contactController.contactUpdateComment);

module.exports = router;
