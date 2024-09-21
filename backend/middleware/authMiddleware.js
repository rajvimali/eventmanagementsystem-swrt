const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Split "Bearer <token>" to get token

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token and attach the user to req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
