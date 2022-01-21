const router = require('express').Router();
const controller = require('../controller');

//MAIL
router.get('/:email', controller.mails.checkValued);
router.post('/', controller.mails.sendAuthMail);
router.patch('/', controller.mails.pendingUpdate);

module.exports = router;
