const router = require('express').Router();
const controller = require('../controller');

//AUTH
router.post('/:playlist_id', controller.youtube.test);

module.exports = router;
