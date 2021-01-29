const express = require('express');
const {
  getContacts,
  createNewContact,
  deleteContact,
  updateContactNameDP,
  addProfileUrl,
  deleteProfileUrl,
  updateProfileUrl,
} = require('../controllers/contact');
const { auth } = require('../utils/middleware');

const router = express.Router();

router.get('/', auth, getContacts);
router.post('/', auth, createNewContact);
router.delete('/:id', auth, deleteContact);
router.patch('/:id/name_dp', auth, updateContactNameDP);
router.post('/:id/url', auth, addProfileUrl);
router.patch('/:id/url/:urlId', auth, updateProfileUrl);
router.delete('/:id/url/:urlId', auth, deleteProfileUrl);

module.exports = router;
