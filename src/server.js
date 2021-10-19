import express from "express";
import listEndpoints from "express-list-endpoints";
import booksRouter from "./Authors/Books/index.js";
/* import booksRouter from "./Authors/Books"; */

const server = express();

server.use(express.json());
server.use("/Books", booksRouter);

const port = 3001;
console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server running on port:", port);
});
