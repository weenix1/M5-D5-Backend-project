import express from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./services/Authors/index.js";
import booksRouter from "./services/Books/index.js";

const server = express();

server.use(express.json());

server.use("/Books", booksRouter);
server.use("/Authors", authorsRouter);

const port = 3001;
console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server running on port:", port);
});
