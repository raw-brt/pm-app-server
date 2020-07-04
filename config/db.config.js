const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pm-app';

const connectDB = () => {
  mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
    })
    .then(response => console.log(`Connected to database: ${response.connections[0].name}`))
    .catch(error => {
      console.error('Error connecting to mongo', error);
      process.exit(1);
    });
    mongoose.set('debug', true);
  }

module.exports = connectDB;