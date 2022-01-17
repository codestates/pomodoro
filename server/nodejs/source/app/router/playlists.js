const router = require('express').Router();
const controller = require('../controller');

//PLAYLIST
router.get('/', controller.playlists.info);
router.post('/', controller.playlists.addItem);
router.put('/', controller.playlists.orderChange); // advanced
router.patch('/:playlist_id', controller.playlists.modifyName);
router.delete('/:playlist_id', controller.playlists.delete);

module.exports = router;
