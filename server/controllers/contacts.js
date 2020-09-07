const router = require('express').Router();
const Contact = require('../models/contact');
const validator = require('validator');
const createError = require('http-errors');

router.get('/', async (_req, res) => {
  const allContacts = await Contact.find({});
  res.json(allContacts);
});

router.post('/', async (req, res) => {
  const { name, contacts } = req.body;

  if (!Array.isArray(contacts) || contacts.length === 0) {
    return res.status(401).send({
      error: 'Contacts field needs to be an array with atleast 1 element.',
    });
  }

  if (!contacts[0].url || !validator.isURL(contacts[0].url)) {
    return res
      .status(401)
      .send({ error: 'Valid URL is required for link field.' });
  }

  if (!site) {
    return res.status(401).send({ error: 'Site name is required.' });
  }

  const newPerson = new Contact({
    name,
    contacts,
  });

  const savedPerson = await newPerson.save();
  return res.status(201).json(savedPerson);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const person = await Contact.findById(id);

  if (!person) {
    return res
      .status(404)
      .send({ error: `Contact with ID: ${id} does not exist in database.` });
  }

  await Contact.findByIdAndDelete(id);
  res.status(204).end();
});

router.post('/:id/url', async (req, res) => {
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

  const person = await Contact.findById(id);

  if (!person) {
    return res
      .status(404)
      .send({ error: `Contact with ID: ${id} does not exist in database.` });
  }

  const newContact = {
    url,
    site,
  };

  person.contacts = [...person.contacts, newContact];
  const savedPerson = await person.save();

  res.status(201).json(savedPerson);
});

router.patch('/:id/url/:urlId', async (req, res) => {
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

  const person = await Contact.findById(id);

  if (!person) {
    return res
      .status(404)
      .send({ error: `Contact with ID: ${id} does not exist in database.` });
  }

  const urlToUpdate = person.contacts.find((c) => c.id === urlId);

  if (!urlToUpdate) {
    return res
      .status(404)
      .send({ error: `URL with ID: ${urlId} does not exist in database.` });
  }

  const updatedUrl = { url, site, id: urlId };

  person.contacts = person.contacts.map((c) =>
    c.id === urlId ? updatedUrl : c
  );

  await person.save();
  res.status(202).json(updatedUrl);
});

router.delete('/:id/url/:urlId', async (req, res) => {
  const { id } = req.params;
  const { urlId } = req.params;

  const person = await Contact.findById(id);

  if (!person) {
    return res
      .status(404)
      .send({ error: `Contact with ID: ${id} does not exist in database.` });
  }

  person.contacts = person.contacts.filter((c) => c.id !== urlId);

  await person.save();
  res.status(204).end();
});

module.exports = router;
