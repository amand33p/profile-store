const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const middleware = require('./utils/middleware');
const contactRouter = require('./controllers/contacts');
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');

const app = express();

const { MONGODB_URI: url } = config;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) =>
    console.error(`Error while connecting to MongoDB: `, error.message)
  );

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/contacts', contactRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

module.exports = app;
