const { laytatca, xoa, capnhat, laymot, themhinh, xoahinh, them } = require("~/controllers/hanghoa.controller");
const { userAuth, adminAuth } = require("~/middlewares/authentication");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.resolve(__dirname, "../uploads/images") });

const router = require("express").Router();

router.route("/:idHangHoa/hinh").post(upload.single("image"), themhinh);
router.route("/:idHangHoa/hinh/:id").delete(xoahinh);

router.route("/").get(laytatca).post(them);
router.route("/:id").get(laymot).put(userAuth, adminAuth, capnhat).delete(userAuth, adminAuth, xoa);

module.exports = router;
