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

require('dotenv').config();
const crypto = require('crypto');
const { createToken } = require('./tokenFunctions');
const { ejsRenderFile, mailSendFunction } = require('./mailFunctions');

const confirmEmailAddress = async (req, res) => {
  const path = `/api/mails POST`;
  const stub = `confirmEmailAddress`;
  console.log(`[stub] ${path} ${stub}`);
  const tokenCheck = checkToken_400_401_404(res, path, req.token);
  if (!tokenCheck) return;
  const { id, email } = req.token;
  const rand = crypto.randomBytes(64).toString('hex');
  // dummydata 를 집어 넣어 payload 값을 길게 만들어 브루트포스 공격 방지
  const payload = {
    auth_id: id,
    salt: rand,
  };

  const authToken__1h = createToken(payload, '1h');

  const path = '/source/app/view/authMail.ejs';
  const purpose = 'emailAuth';
  const emailTemplate = ejsRenderFile(res, purpose, path, {
    email: email,
    code: authToken__1h,
    apiUrl: process.env.GMAIL_AUTHMAIL,
  });

  const mailSubject = '[POMODORO] 회원 인증 메일입니다.';
  const mailOption = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: mailSubject,
    html: emailTemplate,
  };

  const mailSend = mailSendFunction(res, mailOption, authToken__1h);
};

const { verifyToken } = require('./tokenFunctions');
const { findUserInfomation, pendingValidValueCheck } = require('./error/error');
const checkEmaliCertification = (req, res) => {
  const path = `/api/mails PATCH`;
  const stub = `checkEmaliCertification`;
  console.log(`[stub] ${path} ${stub}`);
  const tokenCheck = checkToken_400_401_404(res, path, req.token);
  if (!tokenCheck) return;
  const token = req.body['token'];
  const userInfo = verifyToken(token);
  const { auth_id } = userInfo;
  User.findOne({ where: { user_id: auth_id } })
    .then((user) => {
      findUserInfomation(res, path, user);
      const pending = user.getDataValue('pending');
      pendingValidValueCheck(res, pending);
      return User.update({ pending: false }, { where: { user_id: auth_id } });
    })
    .then((data) => {
      if (data[0] === 0) {
        res.status(400).send('no pending update. (no user_id)');
        throw new Error('pendingUpdate Error');
      }
      return res.status(201).redirect('https://final.eax.kr/').send('ok');
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  get: checkIfEmailAlreadyExists,
  post: confirmEmailAddress,
  patch: checkEmaliCertification,
};
