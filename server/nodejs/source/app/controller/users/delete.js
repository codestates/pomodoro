const { User } = require('../../models');
const crypto = require('crypto');
require('dotenv').config();

const deleteUser = async (req, res) => {
  if (typeof req.token === 'number') {
    console.log(`[ERROR] /api/users DELETE -> req.token is missing or invalid`);
    return res.status(401).send('unauthorized');
  }

  if (!req.token['id']) {
    console.log(`[ERROR] /api/users DELETE -> id does not exist`);
    return res.status(400).send('id does not exist');
  }

  if (isNaN(req.token.id) || req.token.id < 1 || req.token.id > 2147483647) {
    console.log(`[ERROR] /api/users DELETE -> user id is invalid`);
    return res.status(400).send('user id is invalid');
  }

  if (!req.header('X-password')) {
    console.log(`[ERROR] /api/users DELETE -> password is missing`);
    return res.status(400).send('password is missing');
  }

  if (req.header('X-password').length < 8) {
    console.log(`[ERROR] /api/users DELETE -> password is too short`);
    return res.status(400).send('password is too short');
  }

  if (req.header('X-password').length > 128) {
    console.log(`[ERROR] /api/users DELETE -> password is too long`);
    return res.status(400).send('password is too long');
  }

  let userInfo;
  try {
    userInfo = await User.findOne({ where: { user_id: req.token.id } });
  } catch (err) {
    console.log(`[ERROR] /api/users DELETE -> ${err}`);
    return res.status(500).send('Internal Server Error');
  }
  if (!userInfo) {
    console.log(`[ERROR] /api/users DELETE -> user not found`);
    return res.status(404).send('delete failed');
  }

  //check if password is correct
  const hash = crypto
    .createHmac('sha256', userInfo.salt + process.env.SALT_SECRET)
    .update(req.header('X-password'))
    .digest('hex');

  if (hash !== userInfo.pwd_hash) {
    console.log(`[ERROR] /api/users DELETE -> password is incorrect`);
    return res.status(404).send('delete failed');
  }

  let destroyResult;
  try {
    destroyResult = await User.destroy({ where: { user_id: req.token.id } });
  } catch (err) {
    console.log(`[ERROR] /api/users DELETE -> ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  if (!destroyResult) {
    console.log(`[ERROR] /api/users DELETE -> user not found`);
    return res.status(404).send('delete failed');
  }

  console.log(
    `[SUCCESS] /api/users DELETE -> user ${userInfo.nickname} deleted`
  );
  return res.status(204).send();
};

module.exports = deleteUser;
