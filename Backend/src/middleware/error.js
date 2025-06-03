const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    // Mongoose validation error
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      error: messages
    });
  }

  res.status(500).json({
    error: 'Server error'
  });
};

module.exports = errorHandler;