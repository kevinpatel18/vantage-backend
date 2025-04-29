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

router.get("/listbyid/:id", courseController.courseGetById);
router.get("/list", courseController.courseGetAll);
router.get("/adminlist", courseController.courseAdminGetAll);
router.delete("/delete/:id", verifyToken, courseController.courseDelete);
router.get("/duplicate/:id", verifyToken, courseController.courseDuplicate);

module.exports = router;
