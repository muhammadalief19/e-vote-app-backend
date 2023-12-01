import express from "express";
const router = express.Router();
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCandidate,
} from "../controllers/UserController.js";
import multer from "multer";
import path from "path";
import { verifyUser } from "../middleware/AuthUser.js";

// upload foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/foto-profile");
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

router.get("/", verifyUser, getUsers);

router.get("/candidate", verifyUser, getCandidate);

router.post(
  "/",
  verifyUser,
  verifyUser,
  upload.single("foto_profile"),
  createUser
);

router.get("/:id", verifyUser, getUserById);

router.patch("/:id", verifyUser, upload.single("foto_profile"), updateUser);

router.delete("/:id", verifyUser, deleteUser);

export default router;
