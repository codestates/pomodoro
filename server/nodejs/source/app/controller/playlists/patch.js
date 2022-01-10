const { Playlist } = require('../../models');
const { utf8Length } = require('../utils/utils');

const renamePlaylists = async (req, res) => {
  if (typeof req.token === 'number') {
    console.log(`[ERROR] /api/playlists PATCH -> req.token = ${req.token}`);
    return res.status(401).send('unauthorized');
  }

  if (!req.token['id']) {
    console.log(`[ERROR] /api/playlists PATCH -> id does not exist`);
    return res.status(400).send('id does not exist');
  }

  if (isNaN(req.token.id) || req.token.id < 1 || req.token.id > 2147483647) {
    console.log(`[ERROR] /api/playlists PATCH -> user id is invalid`);
    return res.status(400).send('user id is invalid');
  }

  if (
    !req.body['playlist_name'] ||
    typeof req.body.playlist_name !== 'string'
  ) {
    console.log(`[ERROR] /api/playlists PATCH -> playlist_name does not exist`);
    return res.status(400).send('insufficient parameters');
  }

  if (req.body.playlist_name.trim().length === 0) {
    console.log(
      '[ERROR] /api/playlists PATCH -> 400 : playlist_name only has whitespaces'
    );
    return res.status(400).send('playlist_name is invalid');
  }

  if (utf8Length(req.body.playlist_name) > 128) {
    console.log(
      '[ERROR] /api/playlists PATCH -> 400 : playlist_name is too long'
    );
    return res.status(400).send('playlist_name is too long');
  }

  let isPlaylistUsers;
  try {
    isPlaylistUsers = await Playlist.findOne({
      where: { playlist_id: req.params.playlist_id },
    });
  } catch (err) {
    console.log(`[ERROR] /api/playlists PATCH -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  if (!isPlaylistUsers) {
    console.log(
      `[ERROR] /api/playlists PATCH -> 404 : playlist_id ${req.params.playlist_id} does not exist`
    );
    return res.status(404).send('playlist not found');
  }

  if (isPlaylistUsers.dataValues.user_id !== req.token.id) {
    console.log(
      `[ERROR] /api/playlists PATCH -> 403 : user ${req.token.username} is not the owner of playlist_id ${req.params.playlist_id}`
    );
    return res.status(403).send('you are not the owner of this playlist');
  }

  const query = { playlist_name: req.body.playlist_name };
  const options = {
    where: { user_id: req.token.id, playlist_id: req.params.playlist_id },
  };
  let result;
  try {
    result = await Playlist.update(query, options);
  } catch (err) {
    console.log(`[ERROR] /api/playlists PATCH -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  if (result[0] === 0) {
    console.log(
      `[ERROR] /api/playlists PATCH -> 404 : playlist does not exist`
    );
    return res.status(404).send('playlist does not exist');
  }

  console.log(
    `[SUCCESS] /api/playlists PATCH -> 204 : playlist renamed: ${req.body.playlist_name}`
  );
  return res.status(204).send();
};

module.exports = renamePlaylists;
