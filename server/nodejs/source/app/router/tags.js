const router = require('express').Router();
const controller = require('../controller');

//AUTH
router.get('/', controller.tags.get);

module.exports = router;
