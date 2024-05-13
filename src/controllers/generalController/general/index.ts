import express from "express";
import { seedTestData } from "../seedTestData";
import { getFirstNormalTable } from "../1NT";

const router = express.Router();

router.post("/testData", seedTestData);
router.get("/1NT/:page", getFirstNormalTable);

export default router;
