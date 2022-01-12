const { User } = require('../../models');
const { utf8Length, checkEmaliValidity } = require('./utils');

const checkIfEmailAlreadyExists = (req, res) => {
  if (!req.params['email']) {
    console.log('[ERROR] /api/mails GET -> 400 : email is required');
    return res.status(400).send('email is required');
  }

  if (utf8Length(req.params.email) > 89) {
    console.log('[ERROR] /api/mails GET -> 400 : email is too long');
    return res.status(400).send('email is too long');
  }

  const email = decodeURI(req.params.email);

  if (typeof email !== 'string') {
    console.log('[ERROR] /api/mails GET -> 400 : email is invalid');
    return res.status(400).send('email is invalid');
  }

  if (!checkEmaliValidity(email)) {
    console.log('[ERROR] /api/mails GET -> 400 : email is invalid');
    return res.status(400).send('email is invalid');
  }

  User.findOne({ where: { email } })
    .then((query) => {
      if (query) {
        console.log('[ERROR] /api/mails GET -> 409 : email already exists');
        return res.status(409).send('email already exists');
      }
      console.log(`[SUCCESS] /api/mails GET -> 204 : ${email} is available`);
      return res.status(204).send();
    })
    .catch((err) => {
      console.log('[ERROR] /api/mails GET -> 500 : ', err);
      return res.status(500).send('Internal Server Error');
    });
};

const confirmEmailAddress = async (req, res) => {
  const stub = `[stub] /api/mails POST`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = {
  get: checkIfEmailAlreadyExists,
  post: confirmEmailAddress,
};
