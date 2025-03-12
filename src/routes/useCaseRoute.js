const express = require("express");
const router = express.Router();
const useCaseController = require("../controllers/useCaseController");
const { upload, uploadToFilebase } = require("../utils/upload");

router.post(
  "/store",
  upload.single("filePath"),
  uploadToFilebase,
  useCaseController.useCaseAdd
);
router.get("/list", useCaseController.useCaseGetAll);
router.delete("/delete/:id", useCaseController.useCaseDelete);

module.exports = router;
