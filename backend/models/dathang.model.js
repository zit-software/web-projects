/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const MongooseService = require("~/services/mongoose.service");
const DatHang = new mongoose.Schema(
	{
		id: {
			type: Number,
		},
		ngayDH: {
			type: Date,
			required: true,
		},
		ngayGH: {
			type: Date,
			required: true,
		},
		trangThaiDH: {
			type: String,
			reuire: true,
			default: "received",
		},
		kh: {
			type: mongoose.ObjectId,
			ref: "KhachHang",
		},
		nv: {
			type: mongoose.ObjectId,
			ref: "NhanVien",
			require: false,
		},
		isDeleted: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

MongooseService.setupSoftDelete(DatHang);
autoIncrement.initialize(mongoose.connection);
DatHang.plugin(autoIncrement.plugin, {
	model: "DatHang",
	field: "id",
	startAt: 1000,
});
module.exports = {
	schema: DatHang,
	model: mongoose.model("DatHang", DatHang),
};
