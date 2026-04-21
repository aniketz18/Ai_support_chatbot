const Business = require('../models/Business');

const getBusinessProfile = async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user.id });
    if (business) {
      res.json(business);
    } else {
      res.status(404).json({ message: 'Business profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createOrUpdateBusinessProfile = async (req, res) => {
  try {
    const { businessName, websiteURL, description, faqs } = req.body;

    let business = await Business.findOne({ userId: req.user.id });

    if (business) {
      // Update
      business.businessName = businessName || business.businessName;
      business.websiteURL = websiteURL || business.websiteURL;
      business.description = description || business.description;
      business.faqs = faqs || business.faqs;

      const updatedBusiness = await business.save();
      res.json(updatedBusiness);
    } else {
      // Create
      business = await Business.create({
        userId: req.user.id,
        businessName,
        websiteURL,
        description,
        faqs,
      });
      res.status(201).json(business);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getBusinessProfile,
  createOrUpdateBusinessProfile,
};
