const router = require('express').Router();
const controller = require('../controller');

//AUTH
router.post('/', controller.tags.get);

module.exports = router;
