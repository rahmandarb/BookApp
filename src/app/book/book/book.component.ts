import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadBooks();

    // Get the selected book ID from the query param map if available
    this.route.queryParamMap.subscribe((params) => {
      const bookId = params.get('selectedBookId');
      if (bookId) {
        this.selectedBook = this.bookService.getBooks(30, 1).find(book => book.id === +bookId);
        if (this.selectedBook) {
          this.bookService.setSelectedBook(this.selectedBook);
          this.unshiftSelectedBook(this.selectedBook);
        }
      }
    });
  }

  loadBooks(): void {
    const newBooks = this.bookService.getBooks(this.limit, this.pageno);
  
    // Filter out the selected book from the new books
    const filteredBooks = newBooks.filter(book => !this.selectedBook || book.id !== this.selectedBook.id);
  
    // Add the filtered books to the list
    this.bookList = this.filterDuplicates([...this.bookList, ...filteredBooks]);
  
    this.pageno++;
  }

  filterDuplicates(bookArray: any[]): any[] {
    // Filter out duplicate books based on the 'id' property
    const uniqueBooks = bookArray.filter((book, index, self) =>
      index === self.findIndex(b => b.id === book.id)
    );
    return uniqueBooks;
  }

  unshiftSelectedBook(book: any): void {
    // Add the selected book to the beginning of the list if it's not already there
    if (!this.bookList.some(b => b.id === book.id)) {
      this.bookList.unshift(book);
    }
  }

  selectBook(book: any): void {
    this.selectedBook = book;
    this.bookService.setSelectedBook(book);

    // Update the URL with the selected book's ID in the query params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { selectedBookId: book.id },
      queryParamsHandling: 'merge'  // Merge with existing query params if any
    });

    console.log('Selected Book:', this.selectedBook);
  }

  clearSelection(): void {
    this.selectedBook = null;
    this.bookService.setSelectedBook(null);

    // Remove the selectedBookId from the query params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { selectedBookId: null },
      queryParamsHandling: 'merge'
    });
  }
}