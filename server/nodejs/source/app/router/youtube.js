const router = require('express').Router();
const controller = require('../controller');

//AUTH
router.post('/:playlist_id', controller.youtube.saveMusicAndThumbnail);

module.exports = router;
