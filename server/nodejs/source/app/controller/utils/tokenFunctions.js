const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenParser = async (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) {
    req.token = 404;
    next();
    return;
  }
  try {
    token = token.split(' ')[1];
  } catch (e) {
    req.token = 400;
    next();
    return;
  }
  try {
    req.token = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    if (e.message === 'jwt expired') req.token = 401;
    else req.token = 400;
  }

  next();
};

const createToken = (payload, period) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: period });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.error(e);
    return null;
  }
};

module.exports = {
  tokenParser: function () {
    return tokenParser;
  },
  createToken,
  verifyToken,
};
