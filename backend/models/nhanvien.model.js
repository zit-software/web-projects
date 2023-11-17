const mongoose = require("mongoose");
const MongooseService = require("~/services/mongoose.service");
const autoIncrement = require("mongoose-auto-increment");

const NhanVien = new mongoose.Schema(
	{
		id: {
			type: Number,
		},
		ten: {
			type: String,
			require: true,
		},
		sdt: {
			type: String,
			require: true,
			validate: {
				validator: function isVietnamesePhoneNumberValid(number) {
					return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
				},
				message: () => "Số điện thoại không hợp lệ",
			},
		},
		chucvu: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
		diachi: {
			type: String,
			require: true,
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
MongooseService.setupSoftDelete(NhanVien);
autoIncrement.initialize(mongoose.connection);
NhanVien.plugin(autoIncrement.plugin, {
	model: "NhanVien",
	field: "id",
	startAt: 1000,
});
module.exports = {
	schema: NhanVien,
	model: mongoose.model("NhanVien", NhanVien),
};
