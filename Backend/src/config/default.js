// filepath: c:\Users\CHAMA COMPUTERS\Downloads\Pathum\pluck-and-pay-tea\Backend\src\config\default.js
module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION || '30d'
};