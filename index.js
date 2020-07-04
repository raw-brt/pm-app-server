const express = require('express');
const connectDB = require('./config/db.config.js');

// Spin up server
const app = express();

// Connect to database
connectDB();

// Apply middlewares
app.use(express.json({ extended: true }));

// Set homepage
app.get('/', (req, res) => res.send('Hi'));

// Import routes
app.use('/api/users', require('./routes/user.routes'));

// Start app
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running in port: ${PORT}`);
});