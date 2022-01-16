const { mailTranport } = require('../../config/email');
require('dotenv').config();
const ejs = require('ejs');
const { createToken } = require('./tokenFunctions');
const crypto = require('crypto');
const { mailSendFunction, ejsRenderFile } = require('./mailFunctions');
const { User } = require('../../models/');
const { checkInputData, findUserInfomation } = require('./error/error');

const sendEmailToRetrievePassword = async (req, res) => {
  const path = `/api/passwords POST`;
  const stub = `sendEmailToRetrievePassword`;
  console.log(`[stub] ${path} ${stub}`);

  checkInputData(res, [req.body['email']]);
  const { email } = req.body;

  const findUser = await User.findOne({ where: { email } }).then((user) => {
    findUserInfomation(res, user);
    const rand = crypto.randomBytes(64).toString('hex');
    const user_id = user.getDataValue('user_id');
    const payload = {
      auth_id: user_id,
      salt: rand,
    };
    const authToken__10m = createToken(payload, '10m');

    const path = '/source/app/view/passwordMail.ejs';
    const purpose = 'forgetPassword';
    const emailTemplate = ejsRenderFile(res, purpose, path, {
      code: authToken__10m,
      apiUrl: process.env.GMAIL_PASSWORDMAIL,
    });

    const mailSubject = '[POMODORO] 비밀번호 찾기 메일입니다.';
    const mailOption = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: mailSubject,
      html: emailTemplate,
    };

    const mailSend = mailSendFunction(res, mailOption, authToken__10m);
  });
};

const changeUserPassword = async (req, res) => {
  const path = `/api/passwords PATCH`;
  const stub = `changeUserPassword`;
  console.log(`[stub] ${path} ${stub}`);
};

module.exports = {
  post: sendEmailToRetrievePassword,
  patch: changeUserPassword,
};
