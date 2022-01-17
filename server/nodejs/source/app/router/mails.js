const router = require('express').Router();
const controller = require('../controller');

//MAIL
router.get('/:email', controller.mails.checkValued);
router.post('/', controller.mails.sendAuthMail);
// router.post('/:user_id', controller.mails.pendingUpdate);

module.exports = router;
