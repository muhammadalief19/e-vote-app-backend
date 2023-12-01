import express from "express";
import {
  getCandidates,
  createCandidate,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  updateVisiMisi,
} from "../controllers/CandidateController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/", verifyUser, getCandidates);

router.post("/", verifyUser, createCandidate);

router.get("/:id", verifyUser, getCandidateById);

router.patch("/:id", verifyUser, updateCandidate);

router.patch("/visi-misi/:id", verifyUser, updateVisiMisi);

router.delete("/:id", verifyUser, deleteCandidate);

export default router;
