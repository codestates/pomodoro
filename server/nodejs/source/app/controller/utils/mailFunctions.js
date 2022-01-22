require('dotenv').config();
const ejs = require('ejs');
const { mailTranport } = require('../../config/email');

const ejsRenderFile = (res, purpose, path, data) => {
  let emailTemplate;

  const renderCallback = (error, data) => {
    if (error) {
      console.error('[ERROR] /api/mails POST -> 500 : ', error);
      return res.status(500).send('ejs conversion error');
    } else {
      emailTemplate = data;
    }
  };

  if (purpose === 'emailAuth') {
    const { email, code, apiUrl } = data;
    ejs.renderFile(path, { email, code, apiUrl }, renderCallback);
  }
  if (purpose === 'forgetPassword') {
    const { code, apiUrl } = data;
    ejs.renderFile(path, { code, apiUrl }, renderCallback);
  }
  if (purpose === 'initPassword') {
    const { password } = data;
    ejs.renderFile(path, { password }, renderCallback);
  }
  return emailTemplate;
};

const mailSendFunction = (res, mailOption, authToken) => {
  mailTranport.sendMail(mailOption, function (error, info) {
    if (error) {
      console.error('[ERROR] /api/mails POST -> 500 : ', error);
      return res.status(500).send('sendMail error');
    } else {
      console.log('Email send :' + info.response);
      return res.status(200).send('Authentication mail sent');
    }
  });
};

module.exports = {
  ejsRenderFile,
  mailSendFunction,
};
