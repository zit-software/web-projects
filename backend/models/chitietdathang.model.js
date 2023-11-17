/* eslint-disable valid-typeof */
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const MongooseService = require("~/services/mongoose.service");
const ChiTietDatHang = new mongoose.Schema(
	{
		id: {
			type: Number,
		},
		donhang: {
			type: mongoose.ObjectId,
			ref: "DatHang",
		},
		soluong: {
			type: Number,
			require: true,
		},
		gia: {
			type: BigInt,
			require: true,
		},
		giamgia: {
			type: Number,
		},
		isDeleted: {
			type: Boolean,
			require: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

MongooseService.setupSoftDelete(ChiTietDatHang);
autoIncrement.initialize(mongoose.connection);
ChiTietDatHang.plugin(autoIncrement.plugin, {
	model: "ChiTietDatHang",
	field: "id",
	startAt: 1000,
});
module.exports = {
	schema: ChiTietDatHang,
	model: mongoose.model("ChiTietDatHang", ChiTietDatHang),
};
