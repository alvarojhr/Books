const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  pages: { type: Number, required: true },
  isbn: { type: String, required: true },
  author: { type: String, required: true },
  editor: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
