const { Playlist } = require('../../models');
const { utf8Length } = require('../utils/utils');

const changeMusicOrder = async (req, res) => {
  if (typeof req.token === 'number') {
    console.log(
      `[ERROR] /api/playlists/:playlist_id PUT -> req.token = ${req.token}`
    );
    return res.status(401).send('unauthorized');
  }

  if (!req.token['id']) {
    console.log(`[ERROR] /api/playlists/:playlist_id PUT -> id does not exist`);
    return res.status(400).send('id does not exist');
  }

  if (isNaN(req.token.id) || req.token.id < 1 || req.token.id > 2147483647) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id PUT -> user id is invalid`
    );
    return res.status(400).send('user id is invalid');
  }

  if (!req.params['playlist_id']) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id PUT -> playlist_id does not exist`
    );
    return res.status(400).send('playlist_id does not exist');
  }

  if (
    isNaN(req.params.playlist_id) ||
    req.params.playlist_id < 1 ||
    req.params.playlist_id > 10
  ) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id PUT -> playlist_id is invalid : ${req.params.playlist_id}`
    );
    return res.status(400).send('playlist_id is invalid');
  }

  //check if order has valid format
  if (!req.body['music_order']) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id PUT -> 400 : music_order does not exist`
    );
    return res.status(400).send('insufficient parameters');
  }

  if (
    typeof req.body.music_order !== 'object' ||
    !Array.isArray(req.body.music_order)
  ) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id PUT -> 400 : music_order is invalid`
    );
    return res.status(400).send('music_order is invalid');
  }

  //check if music_order has valid format
  const checkArray = JSON.stringify(req.body.music_order);
  if (utf8Length(checkArray) > 256) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id PUT -> 400 : music_order is too long`
    );
    return res.status(400).send('music_order is too long');
  }

  const regex = /[^0-9,\[\]]/g;
  if (regex.test(checkArray)) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id PUT -> 400 : music_order is invalid`
    );
    return res.status(400).send('music_order is invalid');
  }

  //update playlist
  const payload = { music_order: checkArray };
  const options = {
    where: { user_id: req.token.id, playlist_id: req.params.playlist_id },
  };
  let result;
  try {
    result = await Playlist.update(payload, options);
  } catch (err) {
    console.log(`[ERROR] /api/playlists/:playlist_id PUT -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  if (!result) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id PUT -> 404 : playlist not found`
    );
    return res.status(404).send('playlist not found');
  }

  console.log(
    `[SUCCESS] /api/playlists/:playlist_id PUT -> 204 : playlist order updated`
  );
  return res.status(204).send();
};

module.exports = changeMusicOrder;
