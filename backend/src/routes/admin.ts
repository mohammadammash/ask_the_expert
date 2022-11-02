import { Router } from "express";
const router = Router();
//internal imports:
const {getAllUsersWithStatistics, banUser, unBanUser} = require('../controllers/admin');

router.get("/", getAllUsersWithStatistics);
router.post("/ban", banUser);
router.post("/unban", unBanUser);

module.exports = router;