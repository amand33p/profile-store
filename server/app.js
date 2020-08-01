const express = require("express");

require("express-async-errors");
require("./database/db");

const cors = require("cors");
const contactRouter = require("./routes/contacts");
const specificContactRouter = require("./routes/specificContacts");
const middleware = require("./utils/middleware");

const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRouter);
app.use("/api/contacts", specificContactRouter);

app.use(middleware.unknownEndPointHandler);
app.use(middleware.errorHandler);

module.exports = app;
