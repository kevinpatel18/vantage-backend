const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { verifyToken } = require("../utils/auth");
const { upload, uploadToFilebase } = require("../utils/upload");

router.post(
  "/store",
  verifyToken,
  upload.single("image"),
  uploadToFilebase,
  courseController.courseAdd
);

router.put(
  "/update/:id",
  verifyToken,
  upload.single("image"),
  uploadToFilebase,
  courseController.courseUpdate
);

router.get("/list", courseController.courseGetAll);
router.delete("/delete/:id", verifyToken, courseController.courseDelete);

module.exports = router;
