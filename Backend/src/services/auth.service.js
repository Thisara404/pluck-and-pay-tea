const jwt = require('jsonwebtoken');
const config = require('../config/default');
const User = require('../models/User');

/**
 * Generate JWT token for a user
 * @param {Object} user - User object
 * @returns {String} - JWT token
 */
exports.generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      role: user.role
    }
  };
  
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
};

/**
 * Verify user credentials
 * @param {String} email - User email
 * @param {String} password - User password
 * @returns {Object} - User object and token
 */
exports.verifyCredentials = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Check password
  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  
  // Generate and return token with user
  const token = this.generateToken(user);
  
  return { 
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

/**
 * Get user by ID
 * @param {String} userId - User ID
 * @returns {Object} - User object without password
 */
exports.getUserById = async (userId) => {
  return await User.findById(userId).select('-password');
};

// Generate a token using your auth.service
const email = 'admin@example.com';
const password = 'password123';

// Make a login request
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email, password })
})
  .then(response => response.json())
  .then(data => {
    // Store the token
    localStorage.setItem('token', data.token);
    console.log('Token saved:', data.token);
  })
  .catch(error => console.error('Login error:', error));