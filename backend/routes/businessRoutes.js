const express = require('express');
const { getBusinessProfile, createOrUpdateBusinessProfile } = require('../controllers/businessController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getBusinessProfile)
  .post(protect, createOrUpdateBusinessProfile);

module.exports = router;
