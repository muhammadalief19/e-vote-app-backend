import express from "express";
import {
  createSuksesi,
  deleteSuksesi,
  getSuksesi,
  getSuksesiById,
  updateSuksesi,
} from "../controllers/SuksesiController.js";
import multer from "multer";
import path from "path";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

// upload poster
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/poster-suksesi");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

// file filter configuration
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true); // file diizinkan
  } else {
    cb(new Error("File Gambar harus berformat jpg,jpeg,png,webp"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { files: 2000000 },
  fileFilter: fileFilter,
});

router.get("/", verifyUser, getSuksesi);
router.post("/", verifyUser, upload.single("poster"), createSuksesi);
router.get("/:id", verifyUser, getSuksesiById);
router.patch("/:id", verifyUser, upload.single("poster"), updateSuksesi);
router.delete("/:id", verifyUser, deleteSuksesi);

export default router;
