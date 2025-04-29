const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.post("/store", eventController.eventAdd);
router.put("/update/:id", eventController.eventUpdate);
router.get("/list", eventController.eventGetAll);
router.delete("/delete/:id", eventController.eventDelete);

module.exports = router;
