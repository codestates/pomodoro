const router = require('express').Router();
const controller = require('../controller');

//AUTH
router.post('/', controller.users.login);

module.exports = router;
