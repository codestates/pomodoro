const { User } = require('../../models');
const { utf8Length } = require('../utils/utils');
const { createToken } = require('../utils/tokenFunctions');
const crypto = require('crypto');
require('dotenv').config();

const login = (req, res) => {
  if (!req.body['nickname'] || !req.body['password']) {
    console.log('[ERROR] /api/auth POST -> 400 : insufficient parameters');
    return res.status(400).send('insufficient parameters');
  }

  if (
    typeof req.body.nickname !== 'string' ||
    typeof req.body.password !== 'string'
  ) {
    console.log(
      '[ERROR] /api/auth POST -> 400 : nickname or password is not string'
    );
    return res.status(400).send('invalid parameters');
  }

  if (utf8Length(req.body.nickname) > 32) {
    console.log('[ERROR] /api/auth POST -> 400 : nickname is too long');
    return res.status(400).send('nickname is too long');
  }

  if (req.body.nickname.trim().length === 0) {
    console.log(
      '[ERROR] /api/auth POST -> 400 : nickname only has whitespaces'
    );
    return res.status(400).send('nickname is invalid');
  }

  if (utf8Length(req.body.password) > 128) {
    console.log('[ERROR] /api/auth POST -> 400 : password is too long');
    return res.status(400).send('password is too long');
  }

  if (utf8Length(req.body.password) < 8) {
    console.log('[ERROR] /api/auth POST -> 400 : password is too short');
    return res.status(400).send('password is too short');
  }

  //get user by nickname
  User.findOne({ where: { nickname: req.body.nickname } })
    .then((result) => {
      if (!result) {
        console.log('[ERROR] /api/auth POST -> 404 : user not found');
        return res.status(404).send('login failed');
      }

      //check if password is correct
      const hash = crypto
        .createHmac('sha256', result.salt + process.env.SALT_SECRET)
        .update(req.body.password)
        .digest('hex');
      req.body.password = undefined;

      if (result.pwd_hash !== hash) {
        console.log('[ERROR] /api/auth POST -> 404 : password is incorrect');
        return res.status(404).send('login failed');
      }

      //generate token
      const tokenInfo = {
        id: result.user_id,
        username: result.nickname,
        email: result.email,
        type: result.user_type,
        pending: result.pending,
      };
      const token = createToken(tokenInfo, '7d');

      //return token
      console.log(
        `[SUCCESS] /api/auth POST -> 200 : user ${result.nickname} logged in`
      );
      res.header('Authorization', 'Bearer ' + token);
      return res.status(200).json({ token });
    })
    .catch((err) => {
      console.log('[ERROR] /api/auth POST -> 500 : ', err);
      return res.status(500).send('Internal Server Error');
    });
};

module.exports = login;
