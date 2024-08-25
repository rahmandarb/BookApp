import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookList: any[] = [];
  limit: number = 10;
  pageno: number = 1;
  selectedBook: any = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
    this.selectedBook = this.bookService.getSelectedBook();  // Retrieve the selected book from the service
  }

  loadBooks(): void {
    const newBooks = this.bookService.getBooks(this.limit, this.pageno);
    this.bookList = [...this.bookList, ...newBooks];
    this.pageno++;
  }

  selectBook(book: any): void {
    this.bookService.setSelectedBook(book);  // Set the selected book in the service
    this.selectedBook = book;  // Update the local variable
    console.log('Selected Book:', this.selectedBook);
  }
}