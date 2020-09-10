const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contacts: [
    {
      url: {
        type: String,
        required: true,
        trim: true,
      },
      site: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  displayPicture: {
    exists: {
      type: Boolean,
      required: true,
      default: 'false',
    },
    link: {
      type: String,
      required: true,
      default: 'null',
    },
    public_id: {
      type: String,
      required: true,
      default: 'null',
    },
  },
});

contactSchema.plugin(uniqueValidator);

// replaces _id with id, convert id to string from ObjectID and deletes __v
contactSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Contact', contactSchema);
