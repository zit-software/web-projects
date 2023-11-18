const HangHoaModel = require("~/models/hanghoa.model").model;
const HinhHHModel = require("~/models/hinhhh.model").model;
const fs = require("fs");
const path = require("path");
class HangHoaController {
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
			const allHangHoas = await HangHoaModel.find(filter, "", {
				skip: offset,
				limit: pageSize,
			}).populate("images");
			const totalRows = await HangHoaModel.count(filter);
			return res.status(200).json({
				totalRows,
				data: allHangHoas,
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
	async laymot(req, res) {
		try {
			const id = req.params.id;
			const hanghoa = await HangHoaModel.findOne({ id });

			if (!hanghoa) {
				return res.status(404).json({
					message: "Không tìm thấy hàng hóa",
				});
			}
			return res.status(200).json(hanghoa);
		} catch (error) {
			res.status(400).send({
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
	async them(req, res) {
		try {
			const hanghoa = new HangHoaModel({
				...req.body,
				images: [],
			});
			await hanghoa.save();
			return res.status(201).json(hanghoa);
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
	async themhinh(req, res) {
		try {
			const image = req.file;
			const id = req.params.idHangHoa;

			const path = `public/images/${image.filename}`;

			const hinh = await HinhHHModel.create({
				path,
				ten: image.originalname,
			});

			await HangHoaModel.updateOne(
				{ id },
				{
					$push: {
						images: hinh,
					},
				}
			);

			return res.status(201).json(hinh.toObject());
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	}
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async xoahinh(req, res) {
		try {
			const idHangHoa = +req.params.idHangHoa;
			const id = +req.params.id;

			const hinh = await HinhHHModel.findOneAndDelete({ id }, { returnOriginal: true });

			await HangHoaModel.updateOne(
				{
					id: idHangHoa,
				},
				{
					$pull: {
						images: { id },
					},
				},
				{ returnOriginal: true }
			);

			if (hinh) {
				fs.unlinkSync(path.resolve(__dirname, "../uploads/images", hinh.path.split("/")[2]));
			}

			return res.status(200).end();
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: error.message });
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
			const result = await HangHoaModel.updateOne(
				{
					id,
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
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {Function} next
	 */
	async xoa(req, res) {
		try {
			const id = req.params.id;

			const result = await HangHoaModel.deleteOne({
				id,
			});
			return res.status(200).json(result);
		} catch (error) {
			return res.status(400).send({
				message: error.message,
			});
		}
	}
}

module.exports = new HangHoaController();
