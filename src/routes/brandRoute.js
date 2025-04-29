const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
const { uploadToFilebase, upload } = require("../utils/upload");

router.post(
  "/store",
  upload.single("image"),
  uploadToFilebase,
  brandController.brandAdd
);
router.put(
  "/update/:id",
  upload.single("image"),
  uploadToFilebase,
  brandController.brandUpdate
);
router.get("/list", brandController.brandGetAll);
router.delete("/delete/:id", brandController.brandDelete);

module.exports = router;
