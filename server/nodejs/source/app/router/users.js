const router = require('express').Router();
const controller = require('../controller');

//USER
router.get('/', controller.users.info);
router.post('/', controller.users.signup);
router.patch('/', controller.users.modify);
router.delete('/', controller.users.delete);

module.exports = router;
