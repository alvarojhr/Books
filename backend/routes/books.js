const express = require("express");

const booksController = require("../controllers/book");

const router = express.Router();

router.post("", booksController.addBook);
router.get("", booksController.getBooks);
router.delete("/:_id", booksController.deleteBook);
router.get("/:id", booksController.getBookById);
router.put("/:id", booksController.updateBook);

module.exports = router;
