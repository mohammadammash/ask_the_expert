import { Router } from "express";
const router = Router();

const { goOnline, addScore } = require("../controllers/expert");

router.post("/go_online", goOnline);
router.post("/add_score", addScore);

module.exports = router;