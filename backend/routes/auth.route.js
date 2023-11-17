const { dangnhap, xacthuc, dangkytk: taouser, doimk } = require("~/controllers/auth.controller");
const { userAuth } = require("~/middlewares/authentication");

const router = require("express").Router();

router.route("/login").post(dangnhap);
router.route("/register").post(taouser);
router.route("/change-password").post(userAuth, doimk);
router.route("/").get(xacthuc);

module.exports = router;
