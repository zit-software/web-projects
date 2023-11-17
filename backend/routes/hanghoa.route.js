const { laytatca, xoa, capnhat, laymot, themhinh, xoahinh } = require("~/controllers/hanghoa.controller");
const { userAuth, adminAuth } = require("~/middlewares/authentication");

const router = require("express").Router();

router.route("/").get(laytatca);
router.route("/:id").get(laymot).put(userAuth, adminAuth, capnhat).delete(userAuth, adminAuth, xoa);

router.route("/hinh").get().post(themhinh);
router.route("/hinh/:id").delete(xoahinh);

module.exports = router;
