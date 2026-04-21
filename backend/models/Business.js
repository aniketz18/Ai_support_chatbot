const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  websiteURL: {
    type: String,
  },
  description: {
    type: String,
  },
  faqs: [
    {
      question: String,
      answer: String,
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);
