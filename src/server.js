import express from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./services/Authors/index.js";
import booksRouter from "./services/Books/index.js";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());
server.use("/Books", booksRouter);
server.use("/Authors", authorsRouter);

// *********************** ERROR MIDDLEWARES ***************************

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

const port = 3001;
console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server running on port:", port);
});
