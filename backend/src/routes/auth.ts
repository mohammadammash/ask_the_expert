const { Router } = require("express");
const router = Router();
//internal imports:
const {registerUserOrExpert, loginUserOrExpert} = require('../controllers/auth');

router.post("/register", registerUserOrExpert);
router.post("/login", loginUserOrExpert);

module.exports = router;