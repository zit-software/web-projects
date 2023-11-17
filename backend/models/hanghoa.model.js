const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const MongooseService = require("~/services/mongoose.service");

const HangHoa = new mongoose.Schema(
	{
		id: {
			type: Number,
		},
		ten: {
			type: String,
			require: true,
		},
		mota: {
			type: String,
			require: true,
		},
		gia: {
			type: Number,
			require: true,
		},
		soluong: {
			type: Number,
			require: true,
			default: 0,
		},
		ghichu: {
			type: String,
		},
		isDeleted: {
			type: Boolean,
			require: true,
			default: false,
		},
		images: {
			type: Array,
			require: true,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

MongooseService.setupSoftDelete(HangHoa);
autoIncrement.plugin(HangHoa, {
	model: "HangHoa",
	field: "id",
	startAt: 1000,
});

module.exports = {
	schema: HangHoa,
	model: mongoose.model("HangHoa", HangHoa),
};
