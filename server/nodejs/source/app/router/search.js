const router = require('express').Router();
const controller = require('../controller');

//AUTH
router.post('/', controller.search.get);

module.exports = router;
