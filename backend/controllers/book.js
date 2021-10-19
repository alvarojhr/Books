const Book = require("../models/book");

exports.addBook = (req, res) => {
  const book = new Book({
    title: req.body.title,
    category: req.body.category,
    pages: req.body.pages,
    isbn: req.body.isbn,
    author: req.body.author,
    editor: req.body.editor,
  });

  book
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Added",
        post: {
          ...result,
          id: result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Creating a book failed!" });
    });
};

exports.getBooks = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const booksQuery = Book.find();
  let fetchedBooks;
  if (pageSize && currentPage) {
    booksQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  booksQuery
    .then((books) => {
      fetchedBooks = books;
      return Book.countDocuments();
    })
    .then((count) => {
      res.status(200).json({ books: fetchedBooks, maxBooks: count });
    })
    .catch((err) => {
      res.status(500).json({ message: "Fetching books failed!" });
    });
};

exports.deleteBook = (req, res) => {
  Book.deleteOne({ _id: req.params._id })
    .then((result) => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Book deleted!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Fetching books failed!" });
    });
};

exports.getBookById = (req, res) => {
  Book.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Book no found!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Fetching book failed!" });
    });
};

exports.updateBook = (req, res) => {
  Book.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      console.log(result);
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Updated!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Updating a book failed!" });
    });
};
