const { mailTranport } = require('../../config/email');
require('dotenv').config();
const ejs = require('ejs');
const { verifyToken, createToken } = require('./tokenFunctions');
const crypto = require('crypto');
const { mailSendFunction, ejsRenderFile } = require('./mailFunctions');
const { User } = require('../../models/');
const {
  checkInputData,
  findUserInfomation,
  sequelizeError,
  checkToken_400_401_404,
} = require('./error/error');

const sendEmailToRetrievePassword = async (req, res) => {
  var path = `/api/passwords POST`;
  const stub = `sendEmailToRetrievePassword`;
  console.log(`[stub] ${path} ${stub}`);
  checkInputData(res, [req.body['email']]);
  const { email } = req.body;

  const findUser = await User.findOne({ where: { email } })
    .then((user) => {
      findUserInfomation(res, this.path, user);
      const rand = crypto.randomBytes(64).toString('hex');
      const user_id = user.getDataValue('user_id');
      const payload = {
        auth_id: user_id,
        salt: rand,
      };
      const authToken__10m = createToken(payload, '10m');

      const ejs_path = '/source/app/view/passwordMail.ejs';
      const purpose = 'forgetPassword';
      const emailTemplate = ejsRenderFile(res, purpose, ejs_path, {
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
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};

const changeUserPassword = async (req, res) => {
  const path = `/api/passwords PATCH`;
  const stub = `changeUserPassword`;
  console.log(`[stub] ${path} ${stub}`);
  const tokenCheck = checkToken_400_401_404(res, path, req.body['token']);
  if (!tokenCheck) return;
  const token = req.body['token'];
  const userInfo = verifyToken(token);
  const { auth_id } = userInfo;
  User.findOne({ where: { user_id: auth_id } })
    .then((user) => {
      findUserInfomation(res, this.path, user);
      const user_id = user.getDataValue('user_id');
      const email = user.getDataValue('email');
      const salt = crypto.randomBytes(16).toString('hex');
      // [a-z][0-9]
      const random_pwd = Math.random().toString(36).substring(2);
      const pwd_hash = crypto
        .createHmac('sha256', salt + process.env.SALT_SECRET)
        .update(random_pwd)
        .digest('hex');
      User.update({ pwd_hash, salt }, { where: { user_id } })
        .then((user) => {
          const ejs_path = '/source/app/view/initPasswordMail.ejs';
          const purpose = 'initPassword';
          const emailTemplate = ejsRenderFile(res, purpose, ejs_path, {
            password: random_pwd,
          });

          const mailSubject = '[POMODORO] 비밀번호 초기화 메일입니다.';
          const mailOption = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: mailSubject,
            html: emailTemplate,
          };

          const mailSend = mailSendFunction(res, mailOption);
          res.send('<script>window.close();</script>');
        })
        .catch((err) => {
          const message = 'password init Error';
          sequelizeError(res, err, path, message);
        });
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};

module.exports = {
  post: sendEmailToRetrievePassword,
  patch: changeUserPassword,
};
