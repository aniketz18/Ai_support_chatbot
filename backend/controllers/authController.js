const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios'); // ✅ FIX

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    // ✅ Response pehle bhej
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user.id),
    });

    // ✅ Webhook call (axios)
    try {
      await axios.post(
        "https://aniket-18.app.n8n.cloud/webhook/edaec3d7-2f99-45f3-b641-65c74ea35d92",
        {
          email: user.email,
          userId: user.id
        }
      );

      console.log("✅ Webhook triggered successfully");
    } catch (err) {
      console.log("❌ Webhook failed:", err.message);
    }

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};