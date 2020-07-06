const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = (req, res, next) => {
  // Read token
  const token = req.header('x-auth-token');

  // If there is no token...
  if (!token) return res.status(401).json({ msg: 'Permission denied' });

  // If there is, validate
  try {
    const isTokenVerified = jwt.verify(token, "" + process.env.JWT_SECRET);
    req.user = isTokenVerified.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Invalid token' });
  };
};