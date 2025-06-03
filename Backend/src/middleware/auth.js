const jwt = require('jsonwebtoken');
const config = require('../config/default');

module.exports = function(req, res, next) {
  // TEMPORARY: Skip authentication for development
  req.user = { id: 'dev-user-123' };
  return next();
  
  // Original code below (commented out temporarily)
  /*
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // Add user to request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
  */
};