const PasswordUtil = require("~/utils/password.util");
const TokenUtil = require("~/utils/token.util");

const NhanVienModel = require("~/models/nhanvien.model").model;
const KhachHangModel = require("~/models/khachhang.model").model;
class AuthController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async dangkytk(req, res) {
		try {
			const { password, username, ...rest } = req.body;
			const availableUser =
				(await KhachHangModel.findOne({
					username,
				})) ||
				(await NhanVienModel.findOne({
					username,
				}));
			if (availableUser) throw new Error("Tài Khoản Đã Tồn Tại");
			const hashedPassword = await PasswordUtil.hash(password);
			const newUser = new KhachHangModel({
				...rest,
				password: hashedPassword,
				username,
			});
			await newUser.save();

			const accessToken = TokenUtil.sign({
				...newUser.toJSON(),
				role: "khach",
			});

			return res.status(200).json({
				newUser,
				accessToken,
			});
		} catch (error) {
			return res.status(400).send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async dangnhap(req, res) {
		try {
			const { username, password } = req.body;

			const user = {
				...(
					await KhachHangModel.findOne({
						username,
					})
				)?.toObject(),
				role: "khach",
			} || {
				...(
					await NhanVienModel.findOne({
						username,
					})
				)?.toObject(),
				role: "nhanvien",
			};

			if (!user) throw new Error(`Không tồn tại tài khoản ${username}`);

			const isValidPassword = await PasswordUtil.compare(password, user.password);
			if (!isValidPassword) throw new Error("Mật khẩu bị sai");
			// Mật khẩu và tài khoản đúng
			const accessToken = TokenUtil.sign(user);
			return res.status(200).json({ accessToken });
		} catch (error) {
			console.log(error);
			return res.status(500).send({
				message: error.message,
			});
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async xacthuc(req, res) {
		try {
			const authorization = req.headers.authorization;
			const currentUser = TokenUtil.decode(authorization.replace("Bearer ", ""));

			return res.status(200).json(currentUser);
		} catch (error) {
			res.status(401).send({
				msg: error.message,
			});
		}
	}
}

module.exports = new AuthController();
