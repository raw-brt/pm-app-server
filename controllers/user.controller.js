// Import model here
const User = require('../models/user.model');

module.exports.createUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    // Validate user
    const user = new User(req.body);

    User.findOne({ email: email })
      .then(existingUser => {
        if (existingUser) return res.status(400).json({ message: 'Email already registered' })
        else user.save().then(user => res.status(201).json(user))
      .catch(next);
      })
    res.send('User creation success')
  } catch (error) {
    console.log(error);
    res.status(400).send('Something went wrong when trying to create a new user');
  }
};