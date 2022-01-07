const { User } = require('../../models');
const crypto = require('crypto');
require('dotenv').config();

const modifyUserInfo = async (req, res) => {
  if (typeof req.token === 'number') {
    console.log(
      `[ERROR] /api/users PATCH -> req.token is not found or invalid`
    );
    return res.status(401).send('unauthorized');
  }

  if (!req.token['id']) {
    console.log(`[ERROR] /api/users PATCH -> id does not exist`);
    return res.status(400).send('id does not exist');
  }

  if (isNaN(req.token.id) || req.token.id < 1 || req.token.id > 2147483647) {
    console.log(`[ERROR] /api/users PATCH -> user id is invalid`);
    return res.status(400).send('user id is invalid');
  }

  if (!req.body['password']) {
    console.log(`[ERROR] /api/users PATCH -> password does not exist`);
    return res.status(400).send('password does not exist');
  }

  if (req.body.password.length > 128) {
    console.log('[ERROR] /api/users PATCH -> 400 : password is too long');
    return res.status(400).send('password is too long');
  }

  const passwordChecker =
    /^(?=.*([A-Z]){1,})(?=.*[!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,128}$/;
  if (!passwordChecker.test(req.body.password)) {
    console.log(
      '[ERROR] /api/users PATCH -> 400 : password does not meet the requirements'
    );
    return res
      .status(400)
      .send(
        'password should contain at least one uppercase letter, one lowercase letter, one number and one special character, and be at least 8 characters long'
      );
  }

  //create new hash and save into database
  const salt = crypto.randomBytes(16).toString('hex');
  const pwd_hash = crypto
    .createHmac('sha256', salt + process.env.SALT_SECRET)
    .update(req.body.password)
    .digest('hex');
  req.body.password = undefined;

  const query = { salt, pwd_hash };
  const options = { where: { user_id: req.token.id } };
  User.update(query, options)
    .then(([modified, result]) => {
      if (modified === 0) {
        console.log(`[ERROR] /api/users PATCH -> user not found`);
        return res.status(404).send('user not found');
      }
      console.log('[INFO] /api/users PATCH -> 204 : user info modified');
      return res.status(204).send();
    })
    .catch((err) => {
      console.log('[ERROR] /api/users PATCH -> 500 : ', err);
      return res.status(500).send('Internal Server Error');
    });
};

module.exports = modifyUserInfo;
