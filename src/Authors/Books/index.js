import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const booksRouter = express.Router();

const currentFilePath = fileURLToPath(import.meta.url);
console.log(currentFilePath);

const parentFolderPath = dirname(currentFilePath);

const booksJSONPath = join(parentFolderPath, "books.json");

console.log(booksJSONPath);

booksRouter.post("/", (req, res) => {
  console.log(req.body);
  const newBook = {
    ...req.body,
    createdAt: new Date(),
    id: uniqid(),
  };

  console.log(newBook);

  const books = JSON.parse(fs.readFileSync(booksJSONPath));

  books.push(newBook);
  fs.writeFileSync(booksJSONPath, JSON.stringify(books));

  res.status(201).send({ id: newBook.id });
});

booksRouter.get("/", (req, res) => {
  console.log(req.body);

  const fileContent = fs.readFileSync(booksJSONPath);
  console.log(JSON.parse(fileContent));

  const arrayOfBooks = JSON.parse(fileContent);

  res.send(arrayOfBooks);
});

booksRouter.get("/:bookId", (req, res) => {
  console.log(req.body);
  // 1. Read the content of students.json file (obtaining an array)

  const books = JSON.parse(fs.readFileSync(booksJSONPath));
  // 2. Find the user by id in the array
  const book = books.find((b) => b.id === req.params.bookId);
  // 3. Send the user as a response
  res.send(book);
});

booksRouter.put("/:bookId", (req, res) => {
  // 1. Read students.json obtaining an array of books
  const books = JSON.parse(fs.readFileSync(booksJSONPath));

  // 2. Modify the specified book
  const index = books.findIndex((book) => book.id === req.params.bookId);
  const updatedBook = { ...books[index], ...req.body };

  books[index] = updatedBook;
  // 3. Save the file with updated list of books
  fs.writeFileSync(booksJSONPath, JSON.stringify(books));

  // 4. Send back a proper response

  res.send(updatedBook);
});

booksRouter.delete("/:bookId", (req, res) => {
  // 1. Read students.json obtaining an array of books
  const books = JSON.parse(fs.readFileSync(booksJSONPath));

  // 2. Filter out the specified student from the array, keeping just the remaining books
  const remainingBooks = books.filter((book) => book.id !== req.params.bookId);

  // 3. Save the remaining books into books.json file again
  fs.writeFileSync(booksJSONPath, JSON.stringify(remainingBooks));

  // 4. Send back a proper response

  res.status(204).send();
});
/* 
const newBook = {
  ...req.body,
  createdAt: new Date(),
  id: uniqid(),
  name: "Zee",
  surname: "Alex",
  email: "zee@gmail.com",
  dateOfBirth: "25.03.2000",
  avatar: "https://ui-avatars.com/api/?name=John+Doe",
}; */

export default booksRouter;
