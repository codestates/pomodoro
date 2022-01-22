const { User } = require('../../models');
const { utf8Length, checkEmaliValidity } = require('../utils/utils');
const { createToken } = require('../utils/tokenFunctions');
const crypto = require('crypto');
require('dotenv').config();

const signUp = async (req, res) => {
  if (!req.body['nickname'] || !req.body['email'] || !req.body['password']) {
    console.log('[ERROR] /api/users POST -> 400 : insufficient parameters');
    return res.status(400).send('insufficient parameters');
  }

  if (
    typeof req.body.nickname !== 'string' ||
    typeof req.body.email !== 'string' ||
    typeof req.body.password !== 'string'
  ) {
    console.log(
      '[ERROR] /api/users POST -> 400 : nickname or email or password is not string'
    );
    return res.status(400).send('invalid parameters');
  }

  if (utf8Length(req.body.nickname) > 32) {
    console.log('[ERROR] /api/users POST -> 400 : nickname is too long');
    return res.status(400).send('nickname is too long');
  }

  if (req.body.nickname.trim().length === 0) {
    console.log(
      '[ERROR] /api/users POST -> 400 : nickname only has whitespaces'
    );
    return res.status(400).send('nickname is invalid');
  }

  if (utf8Length(req.body.email) > 89) {
    console.log('[ERROR] /api/users POST -> 400 : email is too long');
    return res.status(400).send('email is too long');
  }

  if (!checkEmaliValidity(req.body.email)) {
    console.log('[ERROR] /api/users POST -> 400 : email is invalid');
    return res.status(400).send('email is invalid');
  }

  if (req.body.password.length > 128) {
    console.log('[ERROR] /api/users POST -> 400 : password is too long');
    return res.status(400).send('password is too long');
  }

  const passwordChecker =
    /^(?=.*([A-Z]){1,})(?=.*[!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,128}$/;
  if (!passwordChecker.test(req.body.password)) {
    console.log(
      '[ERROR] /api/users POST -> 400 : password does not meet the requirements'
    );
    return res
      .status(400)
      .send(
        'password should contain at least one uppercase letter, one lowercase letter, one number and one special character, and be at least 8 characters long'
      );
  }

  const { nickname, email } = req.body;
  //check if nickname or email already exists
  let nicknameExists, emailExists;
  try {
    nicknameExists = await User.findOne({ where: { nickname } });
  } catch (err) {
    console.log('[ERROR] /api/users POST -> 500 : ', err);
    return res.status(500).send('Internal Server Error');
  }
  if (nicknameExists) {
    console.log('[ERROR] /api/users POST -> 409 : nickname already exists');
    return res.status(409).send('nickname already exists');
  }

  try {
    emailExists = await User.findOne({ where: { email } });
  } catch (err) {
    console.log('[ERROR] /api/users POST -> 500 : ', err);
    return res.status(500).send('Internal Server Error');
  }
  if (emailExists) {
    console.log('[ERROR] /api/users POST -> 409 : email already exists');
    return res.status(409).send('email already exists');
  }

  //hash password and forget it
  const salt = crypto.randomBytes(16).toString('hex');
  const pwd_hash = crypto
    .createHmac('sha256', salt + process.env.SALT_SECRET)
    .update(req.body.password)
    .digest('hex');
  req.body.password = undefined;

  //create user
  const payload = {
    nickname,
    email,
    pwd_hash,
    salt,
    num_pomo: 0,
    user_type: 1, //USER_POMODORO = 1, USER_GOOGLE = 2
    pending: true,
  };

  User.create(payload)
    .then((result) => {
      const tokenInfo = {
        id: result.user_id,
        username: result.nickname,
        email: result.email,
        type: result.user_type,
        pending: result.pending,
      };
      const token = createToken(tokenInfo, '7d');

      console.log(
        `[SUCCESS] /api/users POST -> 201 : user ${result.nickname} created`
      );
      res.header('Authorization', 'Bearer ' + token);
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.log('[ERROR] /api/users POST -> 500 : ', err);
      return res.status(500).send('Internal Server Error');
    });
};

module.exports = signUp;
