const {
	laytatca,
	xoa,
	capnhat,
	laymot,
	themhinh,
	xoahinh,
	them,
	getByIds,
} = require("~/controllers/hanghoa.controller");
const { userAuth, adminAuth } = require("~/middlewares/authentication");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.resolve(__dirname, "../uploads/images") });

const router = require("express").Router();

router.route("/:idHangHoa/hinh").post(userAuth, adminAuth, upload.single("image"), themhinh);
router.route("/:idHangHoa/hinh/:id").delete(userAuth, adminAuth, xoahinh);

router.route("/").get(laytatca).post(userAuth, adminAuth, them);
router.route("/ids/:ids").get(getByIds);
router.route("/:id").get(laymot).put(userAuth, adminAuth, capnhat).delete(userAuth, adminAuth, xoa);

module.exports = router;
