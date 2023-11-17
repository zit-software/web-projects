const TokenUtil = require("~/utils/token.util");
const KhachHangModel = require("~/models/khachhang.model").model;
const NhanVienModel = require("~/models/nhanvien.model").model;
class AuthenticationMiddleWares {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async userAuth(req, res, next) {
		try {
			const authorization = req.headers.authorization;
			if (!authorization) throw new Error("Yêu cầu access token để tiếp tục");
			const accessToken = String(authorization).replace("Bearer ", "");
			if (!accessToken) throw new Error("Access token không hợp lệ");
			const decodedUser = TokenUtil.decode(accessToken);
			const { id, role } = decodedUser;

			if (!decodedUser) throw new Error("Access token không hợp lệ");

			let currentUser;
			switch (role) {
				case "khach":
					currentUser = (await KhachHangModel.findOne({ id })).toJSON();
					req.currentUser = {
						...currentUser,
						role: "khach",
					};
					break;
				case "nhanvien":
					currentUser = (await NhanVienModel.findOne({ id })).toJSON();
					req.currentUser = {
						...currentUser,
						role: "nhanvien",
					};

					req.currentUser = currentUser;
					break;
				default:
					throw new Error("Access token không hợp lệ");
			}
			next();
		} catch (error) {
			console.log(error);
			res.status(401).send({
				message: error.message,
			});
		}
	}
	adminAuth(req, res, next) {
		try {
			const currentUser = req.currentUser;
			if (currentUser.role === "khach") throw new Error("Truy cập bị từ chối");
			next();
		} catch (error) {
			return res.status(401).send({
				message: error.message,
			});
		}
	}
}

module.exports = new AuthenticationMiddleWares();
