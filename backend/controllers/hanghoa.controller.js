const HangHoaModel =
	require("~/models/hanghoa.model").model;
const HinhHHModel = require("~/models/hinhhh.model").model;
const fs = require("fs");
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
			const allHangHoas = await HangHoaModel.find(
				filter,
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			const totalRows = await HangHoaModel.count(
				filter
			);
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
		const id = req.params.id;
		const hanghoa = await HangHoaModel.findById(id);
		if (!hanghoa) {
			return res.status(404).json({
				message: "Không tìm thấy hàng hóa",
			});
		}
		return res.status(200).json(hanghoa);
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
			const images = req.files;
			const id = req.body.id;
			for (const image of images) {
				const path = `public/images/${image.originalname}`;
				const hinh = new HinhHHModel({
					path,
					ten: image.originalname,
				});
				fs.writeFileSync(path, image.buffer);
				await HangHoaModel.updateOne(
					{ id },
					{
						$push: {
							images: hinh,
						},
					}
				);
			}
			return res.status(201);
		} catch (error) {
			return res
				.status(400)
				.json({ message: error.message });
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
			const id = req.params.id;
			const hinh = await HinhHHModel.deleteOne(
				{ id },
				{ returnOriginal: true }
			);

			fs.unlinkSync(hinh.path);

			await HangHoaModel.updateOne(
				{ id },
				{
					$pull: {
						images: hinh,
					},
				}
			);
			return res.status(200);
		} catch (error) {
			return res
				.status(400)
				.json({ message: error.message });
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
