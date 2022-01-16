const router = require('express').Router();
const controller = require('../controller');

//RANK
router.get('/', controller.ranks.info);

module.exports = router;
