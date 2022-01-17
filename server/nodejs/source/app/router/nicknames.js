const router = require('express').Router();
const controller = require('../controller');

//NICKNAME
router.get('/:nickname', controller.nicknames.checkValued);

module.exports = router;
