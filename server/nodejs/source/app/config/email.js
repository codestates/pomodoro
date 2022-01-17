require('dotenv').config();
const nodemailer = require('nodemailer');
const smtpTranport = require('nodemailer-smtp-transport');

const mailTranport = nodemailer.createTransport(
  smtpTranport({
    pool: true,
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    port: 465,
    secure: true,
  })
);

module.exports = {
  mailTranport,
};
