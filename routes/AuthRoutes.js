import express from "express";
const router = express.Router();
import multer from "multer";
import path from "path";
import {
  Login,
  logOut,
  getUserAuth,
  register,
  verifyEmail,
  getCandidateAuth,
  updatePassword,
} from "../controllers/AuthController.js";

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

router.post("/login", Login);

router.post("/verify/:uuid", verifyEmail);

router.post("/register", upload.single("foto_profile"), register);

router.post("/update-password/:id", updatePassword);

router.delete("/logout", logOut);

router.get("/token", getUserAuth);

router.get("/token-user-auth", getCandidateAuth);

export default router;
