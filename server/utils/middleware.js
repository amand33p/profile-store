const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');

    if (!token) {
      return res
        .status(401)
        .send({ error: 'No auth token found. Authorization denied.' });
    }

    const decodedToken = jwt.verify(token, SECRET);

    if (!decodedToken.id) {
      return res
        .status(401)
        .send({ error: 'Token verification failed. Authorization denied.' });
    }

    req.user = decodedToken.id;
    
    next();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const unknownEndpointHandler = (_req, res) => {
  res.status(404).send({ error: 'Unknown endpoint.' });
};

const errorHandler = (error, _req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Malformatted ID.' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'Invalid token.' });
  }

  next(error);
};

module.exports = {
  auth,
  unknownEndpointHandler,
  errorHandler,
};
