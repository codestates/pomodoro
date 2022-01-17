const router = require('express').Router();
const controller = require('../controller');

//PASSWORD
router.post('/', controller.passwords.sendAuthMail);
router.patch('/', controller.passwords.initPassword);

module.exports = router;
