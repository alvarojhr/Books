import { Component, OnInit } from '@angular/core';
import { Libro } from '../libro.model';
import { LibroService } from '../libro.service';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libro-list',
  templateUrl: './libro-list.component.html',
  styleUrls: ['./libro-list.component.css'],
})
export class LibroListComponent implements OnInit {
  books: Libro[] = [];
  totalBooks: number = 0;
  booksPerPage: number = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private booksSub: Subscription;

  constructor(public bookService: LibroService) {
    this.booksSub = this.bookService
      .getPostUpdateListener()
      .subscribe((booksData: { books: Libro[]; booksCount: number }) => {
        this.books = booksData.books;
      });
  }

  ngOnInit(): void {
    this.bookService.getBooks(this.booksPerPage, this.currentPage);
    this.booksSub = this.bookService
      .getPostUpdateListener()
      .subscribe((booksData: { books: Libro[]; booksCount: number }) => {
        this.totalBooks = booksData.booksCount;
        this.books = booksData.books;
      });
  }

  onDelete(id: string): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.bookService.getBooks(this.booksPerPage, this.currentPage);
    });
  }

  onChangedPage(pageData: PageEvent): void {
    this.currentPage = pageData.pageIndex + 1;
    this.booksPerPage = pageData.pageSize;
    this.bookService.getBooks(this.booksPerPage, this.currentPage);
  }
}
