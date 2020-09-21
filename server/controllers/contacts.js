const router = require('express').Router();
const Contact = require('../models/contact');
const User = require('../models/user');
const validator = require('validator');
const { auth } = require('../utils/middleware');
const { cloudinary } = require('../utils/config');

router.get('/', auth, async (req, res) => {
  const allContacts = await Contact.find({ user: req.user });
  res.json(allContacts);
});

router.post('/', auth, async (req, res) => {
  const { name, contacts, displayPicture } = req.body;

  if (!contacts.url || !validator.isURL(contacts.url)) {
    return res
      .status(401)
      .send({ error: 'Valid URL is required for link field.' });
  }

  if (!contacts.site) {
    return res.status(401).send({ error: 'Site name is required.' });
  }

  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).send({ error: 'User does not exist in database.' });
  }

  const newPerson = new Contact({
    name,
    contacts,
    user: user._id,
  });

  if (displayPicture) {
    const uploadedImage = await cloudinary.uploader.upload(
      displayPicture,
      {
        upload_preset: 'profile-store',
      },
      (error) => {
        if (error) return res.status(401).send({ error: error.message });
      }
    );

    newPerson.displayPicture = {
      exists: true,
      link: uploadedImage.url,
      public_id: uploadedImage.public_id,
    };
  }

  const savedPerson = await newPerson.save();
  return res.status(201).json(savedPerson);
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(req.user);
  const person = await Contact.findById(id);

  if (!user) {
    return res.status(404).send({ error: 'User does not exist in database.' });
  }

  if (!person) {
    return res
      .status(404)
      .send({ error: `Contact with ID: ${id} does not exist in database.` });
  }

  if (person.user.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'Access is denied.' });
  }

  if (person.displayPicture.exists === true) {
    await cloudinary.uploader.destroy(
      person.displayPicture.public_id,
      (error) => {
        if (error) res.status(401).send({ error: error.message });
      }
    );
  }

  await Contact.findByIdAndDelete(id);
  res.status(204).end();
});

router.patch('/:id/name_dp', auth, async (req, res) => {
  const { id } = req.params;
  const { name, displayPicture } = req.body;

  if (!name) {
    return res.status(401).send({ error: 'Name field is required.' });
  }

  const user = await User.findById(req.user);
  const person = await Contact.findById(id);

  if (!user) {
    return res.status(404).send({ error: 'User does not exist in database.' });
  }

  if (!person) {
    return res
      .status(404)
      .send({ error: `Contact with ID: ${id} does not exist in database.` });
  }

  if (person.user.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'Access is denied.' });
  }

  if (displayPicture) {
    const uploadedImage = await cloudinary.uploader.upload(
      displayPicture,
      {
        upload_preset: 'profile-store',
      },
      (error) => {
        if (error) return res.status(401).send({ error: error.message });
      }
    );

    await cloudinary.uploader.destroy(
      person.displayPicture.public_id,
      (error) => {
        if (error) res.status(401).send({ error: error.message });
      }
    );

    person.displayPicture = {
      exists: true,
      link: uploadedImage.url,
      public_id: uploadedImage.public_id,
    };
  }

  person.name = name;

  await person.save();
  res.status(202).json(person);
});

router.post('/:id/url', auth, async (req, res) => {
  const { id } = req.params;
  const { url, site } = req.body;

  if (!site) {
    return res.status(401).send({ error: 'Site name is required.' });
  }

  if (!url || !validator.isURL(url)) {
    return res
      .status(401)
      .send({ error: 'Valid URL is required for link field.' });
  }

  const user = await User.findById(req.user);
  const person = await Contact.findById(id);

  if (!user) {
    return res.status(404).send({ error: 'User does not exist in database.' });
  }

  if (!person) {
    return res
      .status(404)
      .send({ error: `Contact with ID: ${id} does not exist in database.` });
  }

  if (person.user.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'Access is denied.' });
  }

  const newContact = {
    url,
    site,
  };

  person.contacts = [...person.contacts, newContact];
  const savedPerson = await person.save();

  res.status(201).json(savedPerson);
});

router.patch('/:id/url/:urlId', auth, async (req, res) => {
  const { id } = req.params;
  const { urlId } = req.params;
  const { url, site } = req.body;

  if (!site) {
    return res.status(401).send({ error: 'Site name is required.' });
  }

  if (!url || !validator.isURL(url)) {
    return res
      .status(401)
      .send({ error: 'Valid URL is required for link field.' });
  }

  const user = await User.findById(req.user);
  const person = await Contact.findById(id);

  if (!user) {
    return res.status(404).send({ error: 'User does not exist in database.' });
  }

  if (!person) {
    return res
      .status(404)
      .send({ error: `Contact with ID: ${id} does not exist in database.` });
  }

  if (person.user.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'Access is denied.' });
  }

  const urlToUpdate = person.contacts.find((c) => c.id === urlId);

  if (!urlToUpdate) {
    return res
      .status(404)
      .send({ error: `URL with ID: ${urlId} does not exist in database.` });
  }

  urlToUpdate.url = url;
  urlToUpdate.site = site;

  person.contacts = person.contacts.map((c) =>
    c.id !== urlId ? c : urlToUpdate
  );

  await person.save();
  res.status(202).json(urlToUpdate);
});

router.delete('/:id/url/:urlId', auth, async (req, res) => {
  const { id } = req.params;
  const { urlId } = req.params;

  const user = await User.findById(req.user);
  const person = await Contact.findById(id);

  if (!user) {
    return res.status(404).send({ error: 'User does not exist in database.' });
  }

  if (!person) {
    return res
      .status(404)
      .send({ error: `Contact with ID: ${id} does not exist in database.` });
  }

  if (person.user.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'Access is denied.' });
  }

  person.contacts = person.contacts.filter((c) => c.id !== urlId);

  await person.save();
  res.status(204).end();
});

router.get('/ping', async (_req, res) => {
  res
    .status(200)
    .send(
      `Backend for Profile Store app by <a href="https://github.com/amand33p" target="_blank">amand33p</>`
    );
});

module.exports = router;
