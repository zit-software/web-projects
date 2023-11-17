const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
	res.render("index.html");
});
router.use("/auth", require("~/routes/auth.route"));
router.use("/khach", require("~/routes/khachhang.route"));
router.use("/nhanvien", require("~/routes/nhanvien.route"));
router.use("/hanghoa", require("~/routes/hanghoa.route"));
router.use("/dathang", require("~/routes/dathang.route"));

module.exports = router;
