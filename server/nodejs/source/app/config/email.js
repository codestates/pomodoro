require('dotenv').config();
const nodemailer = require('nodemailer');

// smtp-transport 사용 하지 않은 상태에서 코드 작성
// npm audit 측에서 상당히 많은 에러가 발생중
const mailTranport = nodemailer.createTransport({
  pool: true,
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  port: 465,
  secure: true,
});

module.exports = {
  mailTranport,
};
