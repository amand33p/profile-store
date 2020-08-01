const router = require("express").Router();
const Contact = require("../models/contacts");

router.get("/", async (_req, res) => {
  const allContacts = await Contact.find({});
  res.status(200).send(allContacts);
});

// add the person for the first time
router.post("/", async (req, res) => {
  const body = req.body;
  const newPerson = new Contact(body);
  const savedPerson = await newPerson.save();
  return res.status(201).send(savedPerson);
});

module.exports = router;
