const router = require("express").Router();
const userCtrl = require("../controller/userCtrl");
const auth = require("../middleware/auth");

router.post("/register", userCtrl.register);
router.get("/refresh_token", userCtrl.refreshToken);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);

router.get("/infor", auth, userCtrl.getUser);

module.exports = router;
