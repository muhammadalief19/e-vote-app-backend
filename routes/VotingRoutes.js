import express from "express";
import {
  getVotings,
  createVoting,
  getVotingById,
  updateVoting,
  deleteVoting,
  resultVoting,
} from "../controllers/VotingController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/", verifyUser, getVotings);
router.post("/", verifyUser, createVoting);
router.get("/:id", verifyUser, getVotingById);
router.patch("/:id", verifyUser, updateVoting);
router.delete("/:id", verifyUser, deleteVoting);

router.get("/results", verifyUser, resultVoting);

export default router;
