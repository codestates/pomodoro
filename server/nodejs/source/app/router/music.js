const router = require('express').Router();
const controller = require('../controller');

//MUSIC
router.get('/:playlist_id/', controller.music.info);
router.post('/:playlist_id/', controller.music.addItem);
router.put('/:playlist_id/:music_id', controller.music.orderChange); // advanced
router.patch('/:playlist_id/:music_id', controller.music.modifyName);
router.delete('/:playlist_id/:music_id', controller.music.delete);

module.exports = router;
