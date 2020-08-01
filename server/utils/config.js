require("dotenv").config();

const { DATABASE_URI } = process.env;
const { PORT } = process.env;

module.exports = {
  DATABASE_URI,
  PORT,
};
