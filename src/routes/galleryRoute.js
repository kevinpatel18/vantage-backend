const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const { uploadToFilebase, upload } = require("../utils/upload");

router.post(
  "/store",
  upload.single("image"),
  uploadToFilebase,
  galleryController.galleryAdd
);
router.put(
  "/update/:id",
  upload.single("image"),
  uploadToFilebase,
  galleryController.galleryUpdate
);
router.get("/list", galleryController.galleryGetAll);
router.delete("/delete/:id", galleryController.galleryDelete);

module.exports = router;
