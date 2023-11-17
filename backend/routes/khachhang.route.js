const { laytatca, xoa, capnhat, laymot } = require("~/controllers/khach.controller");
const { userAuth, adminAuth } = require("~/middlewares/authentication");

const router = require("express").Router();

router.route("/").get(userAuth, adminAuth, laytatca);
router.route("/:id").get(userAuth, laymot).put(userAuth, adminAuth, capnhat).delete(userAuth, adminAuth, xoa);

module.exports = router;
