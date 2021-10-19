import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../libro.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Libro } from '../libro.model';

@Component({
  selector: 'app-libro-create',
  templateUrl: './libro-create.component.html',
  styleUrls: ['./libro-create.component.css'],
})
export class LibroCreateComponent implements OnInit {
  private bookId!: string;
  form!: FormGroup;
  private mode = 'create';
  book!: Libro;

  constructor(
    public libroService: LibroService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      category: new FormControl(null, { validators: [Validators.required] }),
      pages: new FormControl(null, { validators: [Validators.required] }),
      isbn: new FormControl(null, { validators: [Validators.required] }),
      author: new FormControl(null, { validators: [Validators.required] }),
      editor: new FormControl(null, { validators: [Validators.required] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('bookId')) {
        this.mode = 'edit';
        this.bookId = paramMap.get('bookId')!;
        this.libroService.getBook(this.bookId).subscribe((postData) => {
          this.book = {
            id: postData._id,
            title: postData.title,
            category: postData.category,
            pages: postData.pages,
            isbn: postData.isbn,
            author: postData.author,
            editor: postData.editor,
          };

          this.form.setValue({
            title: this.book.title,
            category: this.book.category,
            pages: this.book.pages,
            isbn: this.book.isbn,
            author: this.book.author,
            editor: this.book.editor,
          });
        });
      } else {
        this.mode = 'create';
        this.bookId = null!;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.libroService.addPost(this.form.value);
    } else {
      this.form.value.id = this.bookId;
      this.libroService.updateBook(this.bookId, this.form.value);
    }

    this.form.reset();
  }
}
