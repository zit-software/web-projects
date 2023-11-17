const {
	laytatca,
	laymot,
	dathang,
	capnhat,
	xoa,
} = require("~/controllers/dathang.controller");
const {
	userAuth,
	adminAuth,
} = require("~/middlewares/authentication");

const router = require("express").Router();

router.route("/").get(userAuth, adminAuth, laytatca);
router
	.route("/:id")
	.get(userAuth, laymot)
	.post(userAuth, dathang)
	.put(userAuth, adminAuth, capnhat)
	.delete(userAuth, adminAuth, xoa);

module.exports = router;
