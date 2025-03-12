const express = require("express");
const router = express.Router();
const testimonialsController = require("../controllers/testimonialsController");

router.post("/store", testimonialsController.testimonialsAdd);
router.put("/update/:id", testimonialsController.testimonialsUpdate);
router.get("/list", testimonialsController.testimonialsGetAll);
router.delete("/delete/:id", testimonialsController.testimonialsDelete);

module.exports = router;
