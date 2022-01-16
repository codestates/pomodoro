const router = require('express').Router();
const controller = require('../controller');

//MUSIC
router.get('/', controller.music.info);
router.post('/', controller.music.addItem);
router.put('/:music_id', controller.music.orderChange); // advanced
router.patch('/:music_id', controller.music.modifyName);
router.delete('/:music_id', controller.music.delete);

module.exports = router;
