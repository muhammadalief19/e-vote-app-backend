import express from "express";
import {
  countData,
  countDataStat,
  golputValidation,
  resultVoting,
  validateVoted,
} from "../controllers/ValidateController.js";

const router = express.Router();

router.get("/voted", validateVoted);
router.get("/results", resultVoting);
router.get("/count", countData);
router.get("/count-data-stat", countDataStat);
router.get("/golput-validate/(:id)", golputValidation);

export default router;
