const TokenUtil = require("~/utils/token.util");
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
			const { id, role } = TokenUtil.decode(accessToken);

			if (!decodedUser) throw new Error("Access token không hợp lệ");
			let currentUser;
			switch (role) {
				case "khach":
					currentUser = await KhachModel.findById(id);
					req.currentUser = {
						...currentUser,
						role: "khach",
					};
					break;
				case "nhanvien":
					currentUser = await NhanVienModel.findById(id);
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
			res.status(401).send({
				message: error.message,
			});
		}
	}
	adminAuth(req, res, next) {
		try {
			const currentUser = req.currentUser;
			if (currentUser.role === "nhanvien") throw new Error("Truy cập bị từ chối");
			next();
		} catch (error) {
			return res.status(401).send({
				message: error.message,
			});
		}
	}
}

module.exports = new AuthenticationMiddleWares();
