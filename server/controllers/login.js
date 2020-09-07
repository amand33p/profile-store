const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');
const { SECRET } = require('../utils/config');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .send({ error: 'No account with this email has been registered.' });
  }

  const credentialsValid = await bcrypt.compare(password, user.passwordHash);

  if (!credentialsValid) {
    return res.status(401).send({ error: 'Invalid credentials.' });
  }

  const payloadForToken = {
    id: user._id,
  };

  const token = jwt.sign(payloadForToken, SECRET);

  res
    .status(200)
    .send({ token, displayName: user.displayName, email: user.email });
});

module.exports = router;
