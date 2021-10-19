import { Injectable } from '@angular/core';
import { Libro } from './libro.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/books/';
@Injectable({
  providedIn: 'root',
})
export class LibroService {
  books: Libro[] = [];
  private booksUpdated = new Subject<{ books: Libro[]; booksCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getBooks(booksPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${booksPerPage}&page=${currentPage}`;
    this.http
      .get<{ books: any; maxBooks: number }>(BACKEND_URL + queryParams)
      .pipe(
        map((booksData) => {
          return {
            books: booksData.books.map((book: any) => {
              return {
                title: book.title,
                category: book.category,
                id: book._id,
                pages: book.pages,
                isbn: book.isbn,
                author: book.author,
                editor: book.editor,
              };
            }),
            maxBooks: booksData.maxBooks,
          };
        })
      )
      .subscribe((transData) => {
        this.books = transData.books;
        this.booksUpdated.next({
          books: [...this.books],
          booksCount: transData.maxBooks,
        });
      });
  }

  addPost(libro: Libro) {
    this.http
      .post<{ libro: Libro }>(BACKEND_URL, libro)
      .subscribe((response) => {
        this.router.navigate(['/']);
      });
  }

  deleteBook(bookid: string) {
    return this.http.delete(BACKEND_URL + bookid);
  }

  updateBook(_id: string, book: Libro) {
    this.http.put(BACKEND_URL + _id, book).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  getBook(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      category: string;
      pages: number;
      isbn: string;
      author: string;
      editor: string;
    }>(BACKEND_URL + id);
  }

  getPostUpdateListener() {
    return this.booksUpdated.asObservable();
  }
}
