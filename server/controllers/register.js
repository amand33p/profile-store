const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');
const validator = require('validator');
const { SECRET } = require('../utils/config');

router.post('/', async (req, res) => {
  const { displayName, email, password } = req.body;

  if (!password || password.length < 6) {
    return res
      .status(400)
      .send({ error: 'Password needs to be atleast 6 characters long.' });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).send({ error: 'Valid email address is required.' });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .send({ error: 'An account with this email already exists.' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    displayName,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  const payloadForToken = {
    id: savedUser._id,
  };

  const token = jwt.sign(payloadForToken, SECRET);
  res.status(200).send({
    token,
    displayName: savedUser.displayName,
    email: savedUser.email,
  });
});

module.exports = router;
