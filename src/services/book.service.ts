import { deleteBook, getBookByID, insertBook, updateBook } from "../repositories/books.repositorie.js";
import { Book, NewBook } from "../types/book.js";

export async function getBookByIdService(id: number) {
  return getBookByID(id);
}

export async function createBookService(bookData: NewBook): Promise<Book> {
  return insertBook(bookData);
}

export async function putBookService( id: number, bookData: NewBook ): Promise<Book | null> {
  return updateBook(id, bookData);
}

export async function deleteBookService(id: number): Promise<boolean> {
  return deleteBook(id);
}