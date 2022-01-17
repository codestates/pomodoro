const router = require('express').Router();
const controller = require('../controller');

//AUTH
router.get('/', controller.search.get);

module.exports = router;
