const mongoose = require("mongoose");
const { DATABASE_URI } = require("../utils/config");

const URL = DATABASE_URI;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to datatbase"))
  .catch((error) => console.log(`error ${error}`));
