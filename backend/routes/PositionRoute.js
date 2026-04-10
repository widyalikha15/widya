import express from "express";
import { getPositions } from "../controllers/PositionController.js";

const router = express.Router();

router.get('/positions', getPositions);

export default router;