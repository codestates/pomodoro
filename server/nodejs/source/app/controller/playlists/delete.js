const { Playlist } = require('../../models');

const removePlaylist = async (req, res) => {
  if (typeof req.token === 'number') {
    console.log(
      `[ERROR] /api/playlists DELETE -> req.token is missing or invalid`
    );
    return res.status(401).send('unauthorized');
  }

  if (!req.token['id']) {
    console.log(`[ERROR] /api/playlists DELETE -> id does not exist`);
    return res.status(400).send('id does not exist');
  }

  if (isNaN(req.token.id) || req.token.id < 1 || req.token.id > 2147483647) {
    console.log(`[ERROR] /api/playlists DELETE -> user id is invalid`);
    return res.status(400).send('user id is invalid');
  }

  if (!req.params['playlist_id']) {
    console.log(`[ERROR] /api/playlists DELETE -> playlist_id does not exist`);
    return res.status(400).send('playlist_id does not exist');
  }

  if (
    isNaN(req.params.playlist_id) ||
    req.params.playlist_id < 1 ||
    req.params.playlist_id > 2147483647
  ) {
    console.log(
      `[ERROR] /api/playlists DELETE -> playlist_id is invalid : ${req.params.playlist_id}`
    );
    return res.status(400).send('playlist_id is invalid');
  }

  const where = { user_id: req.token.id, playlist_id: req.params.playlist_id };
  let result;
  try {
    result = await Playlist.destroy({ where });
  } catch (err) {
    console.log(`[ERROR] /api/playlists DELETE -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }
  console.dir(result);
  if (!result) {
    console.log(`[ERROR] /api/playlists DELETE -> 404 : delete failed`);
    return res.status(404).send('delete failed');
  }

  console.log(`[SUCCESS] /api/playlists DELETE -> 204 : delete success`);
  return res.status(204).send();
};

module.exports = removePlaylist;
