const mongoose = require("mongoose");
const DatHangModel =
	require("~/models/dathang.model").model;
const HangHoaModel =
	require("~/models/hanghoa.model").model;
const ChiTietDatHangModel =
	require("~/models/chitietdathang.model").model;
const KhachHangModel =
	require("~/models/khachhang.model").model;
const NhanVienModel =
	require("~/models/nhanvien.model").model;
class DatHangController {
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
			const allDatHangs = await DatHangModel.find(
				filter,
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			const totalRows = await DatHangModel.count(
				filter
			);
			return res.status(200).json({
				totalRows,
				data: allDatHangs,
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
	async dathang(req, res) {
		try {
			const currentUser = req.currentUser;
			if (!currentUser) {
				throw new Error("Bạn chưa đăng nhập");
			}
			if (currentUser.role !== "khach") {
				throw new Error(
					"Bạn không phải là khách hàng"
				);
			}
			const { chitiets, ...info } = req.body;
			const newDatHang = new DatHangModel({
				...info,
				ngayDH: new Date(),
				kh: currentUser._id,
			});
			const hhMap = new Map();
			// Validate
			for (const chitiet of chitiets) {
				const mahh = chitiet.mahh;
				const hanghoa = await HangHoaModel.findById(
					mahh
				);
				hhMap.set(mahh, hanghoa);
				if (!hanghoa) {
					throw new Error(
						"Hàng hóa không tồn tại"
					);
				}
				if (hanghoa.soluong < chitiet.soluong) {
					throw new Error(
						`${hanghoa.ten} chỉ còn ${hanghoa.soluong} sản phẩm}`
					);
				}
			}
			// Persist Data
			const savedDatHang = await newDatHang.save();
			for (const chitiet of chitiets) {
				const hanghoa = hhMap.get(chitiet.mahh);
				const newChiTietDatHang =
					new ChiTietDatHangModel({
						...chitiet,
						dh: savedDatHang._id,
						hanghoa: hanghoa._id,
					});
				await newChiTietDatHang.save();
				await HangHoaModel.findByIdAndUpdate(mahh, {
					$inc: {
						soluong: -chitiet.soluong,
					},
				});
			}
		} catch (error) {
			return res
				.status(400)
				.send({ message: error.message });
		}
	}
}
export default new DatHangController();
