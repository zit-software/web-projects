const KhachHangModel = require("~/models/khachhang.model").model;
const DatHangModel = require("~/models/dathang.model").model;
class KhachController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async laymot(req, res) {
		try {
			const id = req.params.id;
			const khach = await KhachHangModel.findById(id);
			const donhangs = DatHangModel.find({
				kh: {
					id,
				},
			});
			return res.status(200).json({ khach, donhangs });
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
			const allKhachs = await KhachHangModel.find(filter, "", {
				skip: offset,
				limit: pageSize,
			});
			const totalRows = await KhachHangModel.count(filter);
			return res.status(200).json({
				totalRows,
				data: allKhachs,
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
	async xoa(req, res) {
		try {
			const id = req.params.id;
			const result = await KhachHangModel.deleteOne({
				id,
			});
			return res.status(200).json(result);
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
	async capnhat(req, res) {
		try {
			const id = req.params.id;
			const result = await KhachHangModel.updateOne(
				{
					_id: id,
				},
				req.body
			);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).send({
				message: error.message,
			});
		}
	}
}

module.exports = new KhachController();
