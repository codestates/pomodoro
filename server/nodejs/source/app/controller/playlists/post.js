const { Playlist, sequelize } = require('../../models');
const { utf8Length } = require('../utils/utils');

const addPlaylist = async (req, res) => {
  if (typeof req.token === 'number') {
    console.log(`[ERROR] /api/playlists POST -> req.token = ${req.token}`);
    return res.status(401).send('unauthorized');
  }

  if (!req.token['id']) {
    console.log(`[ERROR] /api/playlists POST -> id does not exist`);
    return res.status(400).send('id does not exist');
  }

  if (isNaN(req.token.id) || req.token.id < 1 || req.token.id > 2147483647) {
    console.log(`[ERROR] /api/playlists POST -> user id is invalid`);
    return res.status(400).send('user id is invalid');
  }

  if (
    !req.body['playlist_name'] ||
    typeof req.body['playlist_name'] !== 'string'
  ) {
    console.log(`[ERROR] /api/playlists POST -> playlist_name does not exist`);
    return res.status(400).send('insufficient parameters');
  }

  if (req.body.playlist_name.trim().length === 0) {
    console.log(
      '[ERROR] /api/playlists POST -> 400 : playlist_name only has whitespaces'
    );
    return res.status(400).send('playlist_name is invalid');
  }

  if (utf8Length(req.body.playlist_name) > 128) {
    console.log(
      '[ERROR] /api/playlists POST -> 400 : playlist_name is too long'
    );
    return res.status(400).send('playlist_name is too long');
  }

  const user_id = req.token.id;
  const where = { user_id };
  let playlistCount;
  try {
    playlistCount = await Playlist.count({ where });
  } catch (err) {
    console.log(`[ERROR] /api/playlists POST -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  if (playlistCount >= 10) {
    console.log(
      `[ERROR] /api/playlists POST -> 400 : user ${req.token.username}'s playlist is full`
    );
    return res.status(403).send('playlist is full : you cannot make more');
  }

  const { playlist_name } = req.body;
  let result;
  try {
    result = await Playlist.create({ playlist_name, user_id });
  } catch (err) {
    console.log(`[ERROR] /api/playlists POST -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  const { playlist_id } = result;
  console.log(
    `[SUCCESS] /api/playlists POST -> 201 : playlist ${result.playlist_name} created`
  );
  return res.status(201).json({ playlist_id });
};

module.exports = addPlaylist;
