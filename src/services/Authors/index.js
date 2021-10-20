import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();

const currentFilePath = fileURLToPath(import.meta.url);
console.log(currentFilePath);

const parentFolderPath = dirname(currentFilePath);

const authorsJSONPath = join(parentFolderPath, "authors.json");

console.log(authorsJSONPath);

authorsRouter.post("/", (req, res) => {
  console.log(req.body);
  const newAuthor = {
    ...req.body,
    createdAt: new Date(),
    id: uniqid(),
  };

  console.log(newAuthor);

  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));

  authors.push(newAuthor);
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));

  res.status(201).send({ id: newAuthor.id });
});

authorsRouter.post("/checkEmail", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  if (authors.filter((author) => author.email === req.body.email).length > 0) {
    res.status(403).send({ success: false, data: "user already exist" });
  } else {
    res.status(201).send({ success: true });
  }
});

authorsRouter.get("/", (req, res) => {
  console.log(req.body);

  const fileContent = fs.readFileSync(authorsJSONPath);
  console.log(JSON.parse(fileContent));

  const arrayOfAuthors = JSON.parse(fileContent);

  res.send(arrayOfAuthors);
});

authorsRouter.get("/:authorId", (req, res) => {
  console.log(req.body);
  // 1. Read the content of students.json file (obtaining an array)

  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  // 2. Find the user by id in the array
  const author = authors.find((b) => b.id === req.params.authorId);
  // 3. Send the user as a response
  res.send(author);
});

authorsRouter.put("/:authorId", (req, res) => {
  // 1. Read students.json obtaining an array of authors
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));

  // 2. Modify the specified book
  const index = authors.findIndex(
    (author) => author.id === req.params.authorId
  );
  const updatedAuthor = { ...authors[index], ...req.body };

  authors[index] = updatedAuthor;
  // 3. Save the file with updated list of authors
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));

  // 4. Send back a proper response

  res.send(updatedAuthor);
});

authorsRouter.delete("/:authorId", (req, res) => {
  // 1. Read students.json obtaining an array of books
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));

  // 2. Filter out the specified student from the array, keeping just the remaining books
  const remainingAuthors = authors.filter(
    (author) => author.id !== req.params.authorId
  );

  // 3. Save the remaining books into books.json file again
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors));

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

export default authorsRouter;
