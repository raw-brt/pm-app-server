require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config.js');

// Spin up server
const app = express();

// Connect to database
connectDB();

// Apply middlewares
app.use(express.json({ extended: true }));

// Set homepage
app.get('/', (_, res) => res.send('Hi'));

// Import routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/projects', require('./routes/project.routes'));

// Start app
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running in port: ${PORT}`);
});