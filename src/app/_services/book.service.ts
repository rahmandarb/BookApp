import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books = [
    { id: 1, name: 'Book 1', price: 10 },
    { id: 2, name: 'Book 2', price: 15 },
    { id: 3, name: 'Book 3', price: 20 },
    { id: 4, name: 'Book 4', price: 25 },
    { id: 5, name: 'Book 5', price: 30 },
    { id: 6, name: 'Book 6', price: 35 },
    { id: 7, name: 'Book 7', price: 40 },
    { id: 8, name: 'Book 8', price: 45 },
    { id: 9, name: 'Book 9', price: 50 },
    { id: 10, name: 'Book 10', price: 55 },
    { id: 11, name: 'Book 11', price: 60 },
    { id: 12, name: 'Book 12', price: 65 },
    { id: 13, name: 'Book 13', price: 70 },
    { id: 14, name: 'Book 14', price: 75 },
    { id: 15, name: 'Book 15', price: 80 },
    { id: 16, name: 'Book 16', price: 85 },
    { id: 17, name: 'Book 17', price: 90 },
    { id: 18, name: 'Book 18', price: 95 },
    { id: 19, name: 'Book 19', price: 100 },
    { id: 20, name: 'Book 20', price: 105 },
    { id: 21, name: 'Book 21', price: 110 },
    { id: 22, name: 'Book 22', price: 115 },
    { id: 23, name: 'Book 23', price: 120 },
    { id: 24, name: 'Book 24', price: 125 },
    { id: 25, name: 'Book 25', price: 130 },
    { id: 26, name: 'Book 26', price: 135 },
    { id: 27, name: 'Book 27', price: 140 },
    { id: 28, name: 'Book 28', price: 145 },
    { id: 29, name: 'Book 29', price: 150 },
    { id: 30, name: 'Book 30', price: 155 },
  ];

  private selectedBook: any = null;  // Store the selected book

  constructor() { }

  // Get books with pagination
  getBooks(limit: number, pageno: number) {
    const start = (pageno - 1) * limit;
    const end = start + limit;
    return this.books.slice(start, end);
  }

  // Set selected book
  setSelectedBook(book: any): void {
    this.selectedBook = book;
  }

  // Get selected book
  getSelectedBook(): any {
    return this.selectedBook;
  }
}
