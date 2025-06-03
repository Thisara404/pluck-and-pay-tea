// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Get port from environment or use default
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000'], // Add your frontend URL
  credentials: true
}));

// Serve static files from the "src/uploads" directory
app.use('/uploads', express.static('src/uploads'));

// Custom colorful request logger
morgan.token('status-color', (req, res) => {
  // Get the status code
  const status = res.statusCode;
  
  // Color based on status code
  if (status >= 500) return chalk.red(status); // Server error - Red
  if (status >= 400) return chalk.yellow(status); // Client error - Yellow
  if (status >= 300) return chalk.cyan(status); // Redirection - Cyan
  if (status >= 200) return chalk.green(status); // Success - Green
  return chalk.gray(status); // Other - Gray
});

morgan.token('method-color', (req) => {
  const method = req.method;
  
  // Color based on HTTP method
  switch (method) {
    case 'GET': return chalk.blue(method);
    case 'POST': return chalk.green(method);
    case 'PUT': return chalk.yellow(method);
    case 'DELETE': return chalk.red(method);
    case 'PATCH': return chalk.magenta(method);
    default: return chalk.gray(method);
  }
});

morgan.token('response-time-color', (req, res) => {
  const time = morgan['response-time'](req, res);
  
  // Color based on response time
  if (time >= 500) return chalk.red(`${time}ms`);
  if (time >= 100) return chalk.yellow(`${time}ms`);
  return chalk.green(`${time}ms`);
});

// Use custom format
app.use(morgan((tokens, req, res) => {
  return [
    chalk.gray('['),
    chalk.white(new Date().toISOString()),
    chalk.gray(']'),
    tokens['method-color'](req, res),
    tokens.url(req, res),
    tokens['status-color'](req, res),
    tokens['response-time-color'](req, res),
    chalk.gray(tokens['user-agent'](req, res) || '-')
  ].join(' ');
}));

// Routes
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/pluckers', require('./src/routes/plucker.routes'));
app.use('/api/records', require('./src/routes/record.routes'));
app.use('/api/payments', require('./src/routes/payment.routes'));
app.use('/api/reports', require('./src/routes/report.routes'));

// Root route
app.get('/', (req, res) => {
  res.send('Tea Plantation Management API is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(chalk.red(err.stack));
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(chalk.green(`✓ Server running on port ${PORT}`));
  console.log(chalk.cyan(`✓ API available at http://localhost:${PORT}`));
});