import express from "express";
import {
  getDataUsers,
  getDataUserById,
  createDataUser,
  updateDataUser,
  deleteDataUser,
} from "../controllers/DataUserContorller.js";
import multer from "multer";
import path from "path";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

// upload foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/foto-ktm");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage });

router.get("/", verifyUser, getDataUsers);

router.post("/", verifyUser, upload.single("foto_ktm"), createDataUser);

router.get("/:id", verifyUser, getDataUserById);

router.patch("/:id", verifyUser, upload.single("foto_ktm"), updateDataUser);

router.delete("/:id", verifyUser, deleteDataUser);

export default router;
