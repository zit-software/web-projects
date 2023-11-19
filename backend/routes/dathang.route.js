const { laytatca, laymot, dathang, capnhat, capnhatchitiet, xoa } = require("~/controllers/dathang.controller");
const { userAuth, adminAuth } = require("~/middlewares/authentication");

const router = require("express").Router();

router.route("/").get(userAuth, adminAuth, laytatca).post(userAuth, dathang);
router.route("/chitiet/:id").put(userAuth, adminAuth, capnhatchitiet).delete(userAuth, adminAuth, xoa);
router.route("/:id").get(userAuth, laymot).put(userAuth, adminAuth, capnhat).delete(userAuth, adminAuth, xoa);

module.exports = router;
