const PasswordUtil = require("~/utils/password.util");
const mongoose = require("mongoose");
const NhanVienModel =
	require("~/models/nhanvien.model").model;
class NhanVienController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laytatca(req, res) {
		try {
			const offset = req.query.offset || 0;
			const pageSize = req.query.pageSize || null;
			const term = req.query.term || null;
			const searchBy = req.query.searchBy || null;
			const filter = {};
			if (term) {
				filter[searchBy] = {
					$regex: term,
					$options: "i",
				};
			}
			const allNhanViens = await NhanVienModel.find(
				filter,
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			const totalRows = await NhanVienModel.count(
				filter
			);
			return res.status(200).json({
				totalRows,
				data: allNhanViens,
			});
		} catch (error) {
			return res
				.status(400)
				.send({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laymot(req, res) {
		const id = req.params.id;
		const nhanvien = await NhanVienModel.findOne({
			id,
		});
		if (!nhanvien) {
			return res.status(404).json({
				message: "Không tìm thấy nhân viên",
			});
		}
		return res.status(200).json(nhanvien);
	}
}

module.exports = new NhanVienController();
