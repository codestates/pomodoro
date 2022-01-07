const { User } = require('../../models');
const { utf8Length } = require('./utils');

const checkIfNickNameAlreadyExists = (req, res) => {
  if (!req.params['nickname']) {
    console.log('[ERROR] /api/nicknames GET -> 400 : nickname is required');
    return res.status(400).send('nickname is required');
  }
  if (utf8Length(req.params.nickname) > 32) {
    console.log('[ERROR] /api/nicknames GET -> 400 : nickname is too long');
    return res.status(400).send('nickname is too long');
  }

  const nickname = decodeURI(req.params.nickname);

  User.findOne({ where: { nickname } })
    .then((query) => {
      if (query) {
        console.log(
          '[ERROR] /api/nicknames GET -> 409 : nickname already exists'
        );
        return res.status(409).send('nickname already exists');
      }
      console.log(
        `[SUCCESS] /api/nicknames GET -> 204 : ${nickname} is available`
      );
      return res.status(204).send();
    })
    .catch((err) => {
      console.log('[ERROR] /api/nicknames GET -> 500 : ', err);
      return res.status(500).send('Internal Server Error');
    });
};

module.exports = checkIfNickNameAlreadyExists;
