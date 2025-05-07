const mongoose = require("mongoose");

const tankSchema = new mongoose.Schema({
  tankId: String,
  levelPercent: Number,
  updatedAt: Date
});
module.exports = mongoose.model("Tank", tankSchema);